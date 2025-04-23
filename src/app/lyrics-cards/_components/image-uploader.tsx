'use client';

import React, { useRef, useState, ChangeEventHandler } from 'react';
import { arrayBufferToString } from '@/lib/utils';
import { useAtom } from 'jotai';
import { z } from 'zod';
import { lcLyricsBackground } from '@/lib/store';

import { File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from "@/components/_common/header"

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedImage] = useAtom(lcLyricsBackground);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  const [fileName, setFileName] = useState('');

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file.size > MAX_SIZE) {
      setInvalid(true);
      setError('Image too large.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setInvalid(true);
      setError("It's not an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        setInvalid(true);
        setError("Can't read image.");
        return;
      }
      const result = z.string().safeParse(reader.result);
      setFileName(file.name);
      if (result.success) {
        setSelectedImage(result.data);
      } else {
        const arrayBuffer = reader.result as ArrayBuffer;
        const string = arrayBufferToString(arrayBuffer);
        setSelectedImage(string);
      }
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="w-full max-w-xs">
      <Header as="h3">Upload a background image</Header>
      <div className="space-y-2 w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image-upload" className="border p-2 rounded-lg"><File className="text-xl" /> {fileName ? fileName : "Select your background image"}</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {invalid && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};
