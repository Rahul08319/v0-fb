import React, { useState, useRef } from 'react';
import { FacebookPage, Post } from '../types';
import { useQueue } from '../hooks/useQueue';
import { generateSeoText, generateImage } from '../services/geminiService';
import Card from '../components/Card';
import Button from '../components/Button';
import PostPreview from '../components/PostPreview';
import ScheduleModal from '../components/ScheduleModal';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { UploadIcon } from '../components/icons/UploadIcon';

interface DashboardProps {
  pages: FacebookPage[];
}

const Dashboard: React.FC<DashboardProps> = ({ pages }) => {
  const { addToQueue } = useQueue();
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || '');
  const [postText, setPostText] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imagePrompt, setImagePrompt] = useState('');
  
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateText = async () => {
    if (!topic) {
      alert('Please enter a topic to generate text.');
      return;
    }
    setIsGeneratingText(true);
    try {
      const generatedText = await generateSeoText(topic);
      setPostText(generatedText);
    } catch (error) {
      console.error("Error generating text:", error);
      alert('Failed to generate text. Please try again.');
    } finally {
      setIsGeneratingText(false);
    }
  };
  
  const handleGenerateImage = async () => {
    if (!imagePrompt) {
        alert('Please enter a prompt to generate an image.');
        return;
    }
    setIsGeneratingImage(true);
    try {
        const generatedImageUrl = await generateImage(imagePrompt);
        setImageUrl(generatedImageUrl);
    } catch (error) {
        console.error("Error generating image:", error);
        alert('Failed to generate image. Please try again.');
    } finally {
        setIsGeneratingImage(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmSchedule = (date: Date) => {
    if (!selectedPageId || !postText) {
      alert('Please select a page and add some text for your post.');
      return;
    }
    const post: Omit<Post, 'id' | 'status'> = {
      pageId: selectedPageId,
      text: postText,
      imageUrl,
      scheduledAt: date,
    };
    addToQueue(post);
    // Reset form
    setPostText('');
    setImageUrl(undefined);
    setTopic('');
    setImagePrompt('');
    setIsScheduleModalOpen(false);
    alert('Post scheduled successfully!');
  };
  
  const canSchedule = postText.trim() !== '' && selectedPageId !== '';

  const draftPost: Post = {
    id: 'draft-post',
    pageId: selectedPageId,
    text: postText || 'Your post content will appear here...',
    imageUrl,
    status: 'draft',
    scheduledAt: null
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card title="Create a new post">
        <div className="space-y-6">
          <div>
            <label htmlFor="page-select" className="block text-sm font-medium text-gray-700">
              Select Page
            </label>
            <select
              id="page-select"
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="post-text" className="block text-sm font-medium text-gray-700">
              Post Text
            </label>
            <textarea
              id="post-text"
              rows={6}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="What's on your mind?"
            />
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-800">✨ AI Content Generation</h4>
              <div className="space-y-2">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-600">
                    Generate text from a topic
                </label>
                <div className="flex space-x-2">
                    <input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., social media marketing trends"
                    />
                    <Button onClick={handleGenerateText} isLoading={isGeneratingText} icon={<SparklesIcon className="h-4 w-4" />}>
                        Generate
                    </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-600">
                    Generate an image from a prompt
                </label>
                <div className="flex space-x-2">
                    <input
                        id="image-prompt"
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., a robot reading a book"
                    />
                    <Button onClick={handleGenerateImage} isLoading={isGeneratingImage} icon={<PhotoIcon className="h-4 w-4" />}>
                        Generate
                    </Button>
                </div>
              </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-brand-blue hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsScheduleModalOpen(true)}
                disabled={!canSchedule}
              >
                Schedule Post
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Post Preview</h3>
        <PostPreview post={draftPost} />
      </div>

      <ScheduleModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onConfirmSchedule={handleConfirmSchedule}
      />
    </div>
  );
};

export default Dashboard;
