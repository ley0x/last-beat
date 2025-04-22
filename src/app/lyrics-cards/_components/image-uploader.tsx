'use client';

import React, { useRef, useState, ChangeEventHandler } from 'react';
import { arrayBufferToString } from '@/lib/utils';
import { useAtom } from 'jotai';
import { z } from 'zod';
import { lcLyricsBackground } from '@/lib/store';

import { File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedImage] = useAtom(lcLyricsBackground);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file.size > MAX_SIZE) {
      setInvalid(true);
      setError('Image trop lourde');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setInvalid(true);
      setError("Ce n'est pas une image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        setInvalid(true);
        setError('Impossible de lire le fichier.');
        return;
      }
      const result = z.string().safeParse(reader.result);
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
      <div className="space-y-2 w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image-upload"><File className="text-xl" /> Select your background image</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {invalid && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};
