"use client"
import React from "react";
import { useState, ChangeEvent } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { validateImage } from "image-validator";
import { uploadPhoto } from "@/app/lib/firebase";

export default function CreatePost() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateFile = async (selectedFile: File): Promise<boolean> => {
    const limitFileSize = 3 * 1024 * 1024;

    if (selectedFile.size > limitFileSize) {
      setErrorMsg("File size is too large, please keep it under 3 GB.");
      return false;
    }

    const isValidImage = await validateImage(selectedFile);

    if (!isValidImage) {
      setErrorMsg("You cannot upload anything other than image files.");
      return false;
    }

    return true;
  };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    e.preventDefault();
    const selectedFile = e.target.files?.[0];

    if (selectedFile && (await validateFile(selectedFile))) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(selectedFile);
        setImagePreview(reader.result as string);
        setErrorMsg(null);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadImage = () => {
    if (!file) {
        setErrorMsg("File not selected.");
        return;
    }

    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}_${file.name}`;
    uploadPhoto(uniqueFilename, file);
  }

  return (
    <>
      <Button onPress={onOpen} radius="full" className="bg-gradient-to-tr from-pink-500 to-red-500 text-white">Create</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Post</ModalHeader>
              <ModalBody>
                <form>
                    <input type="file" onChange={handleImageSelect} />
                    <br />
                    <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setErrorMsg(null);
                    }}
                    />
                    <br />
                </form>
                <p style={{ color: "red" }}>{errorMsg && errorMsg}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={uploadImage}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
