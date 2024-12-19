'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Sparkles, Lock, Activity, Link2, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { shortenUrl, shortenUrlWithEmojis, EMOJI_PAIRS } from '@/lib/url-service';
import { ShortenedUrlDisplay } from '@/components/shortened-url-display';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [urlType, setUrlType] = useState<'standard' | 'emoji'>('standard');
  const [options, setOptions] = useState({
    alias: '',
    emojies: 'none',
    password: '',
    maxClicks: '',
    blockBots: false
  });
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      let shortened: string;
      if (urlType === 'emoji') {
        shortened = await shortenUrlWithEmojis(url, {
          emojies: options.emojies === 'none' ? undefined : options.emojies,
          password: options.password || undefined,
          maxClicks: options.maxClicks ? parseInt(options.maxClicks) : undefined,
          blockBots: options.blockBots
        });
      } else {
        shortened = await shortenUrl(url, {
          alias: options.alias || undefined,
          password: options.password || undefined,
          maxClicks: options.maxClicks ? parseInt(options.maxClicks) : undefined,
          blockBots: options.blockBots
        });
      }
      setShortenedUrl(shortened);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl" />
      <Card className="relative max-w-3xl mx-auto p-8 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-none shadow-2xl">
        <Tabs value={urlType} onValueChange={(value) => setUrlType(value as 'standard' | 'emoji')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="standard">Standard URL</TabsTrigger>
            <TabsTrigger value="emoji">Emoji URL</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col space-y-6">
            {/* Main URL Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <InputWithIcon
                icon={<Link2 className="h-4 w-4" />}
                placeholder="Enter your URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 text-base bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !showAdvanced) {
                    handleShorten();
                  }
                }}
              />
            </div>

            {/* URL Type Specific Options */}
            {urlType === 'standard' ? (
              <InputWithIcon
                icon={<Link2 className="h-4 w-4" />}
                placeholder="Custom alias (optional, alphanumeric, max 15 chars)"
                value={options.alias}
                onChange={(e) => setOptions(prev => ({ ...prev, alias: e.target.value }))}
                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              />
            ) : (
              <Select
                value={options.emojies}
                onValueChange={(value) => setOptions(prev => ({ ...prev, emojies: value }))}
              >
                <SelectTrigger className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                  <SelectValue placeholder="Choose Emoji Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Emojis</SelectItem>
                  {EMOJI_PAIRS.map((pair) => (
                    <SelectItem key={pair.value} value={pair.value}>
                      {pair.value} {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Advanced Options Toggle */}
            <div className="flex items-center justify-between pt-2">
              <Button 
                variant="ghost" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </Button>
              
              <Button 
                onClick={handleShorten} 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4 pt-4"
              >
                <InputWithIcon
                  icon={<Lock className="h-4 w-4" />}
                  type="password"
                  placeholder="Password (min 8 chars, letter, number, @ or .)"
                  value={options.password}
                  onChange={(e) => setOptions(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                />

                <InputWithIcon
                  icon={<Activity className="h-4 w-4" />}
                  type="number"
                  placeholder="Maximum clicks (optional)"
                  value={options.maxClicks}
                  onChange={(e) => setOptions(prev => ({ ...prev, maxClicks: e.target.value }))}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="block-bots"
                    checked={options.blockBots}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, blockBots: checked }))}
                  />
                  <Label htmlFor="block-bots" className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    Block Bots
                  </Label>
                </div>
              </motion.div>
            )}
            
            {/* Result Display */}
            {shortenedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <ShortenedUrlDisplay url={shortenedUrl} />
              </motion.div>
            )}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}