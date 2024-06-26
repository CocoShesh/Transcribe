import { useEffect, useState } from "react";
import { Translate } from "../../api/Translator";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import Translation, { TranslationItem } from "../Translation";
import {
  countWords,
  copyText,
  downloadTranscript,
} from "../../utils/WordUtils";

type TranscriptProps = {
  transcript: string;
};

const Transcript = ({ transcript }: TranscriptProps) => {
  const [isTranscriptionView, setIsTranscriptionView] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fil");
  const [translation, setTranslation] = useState<TranslationItem[]>([]);

  const toggleView = (): void => {
    setIsTranscriptionView(!isTranscriptionView);
  };

  useEffect(() => {
    Translate({ text: transcript, target: selectedLanguage }).then(data => {
      setTranslation(data);
    });
  }, [transcript, selectedLanguage, setTranslation]);

  return (
    <>
      <section className="mt-3 flex flex-col text-center w-[500px] h-fit px-5  max-sm:w-full">
        {isTranscriptionView ? (
          <h1 className="font-bold text-2xl text-[#183153] dark:text-white">
            Your Transcription
          </h1>
        ) : (
          <h1 className="font-bold text-2xl text-[#183153] dark:text-white">
            Your Translation
          </h1>
        )}
        <section className="flex w-full h-fit p-2 border-2 mt-5 border-[#183153] dark:border-white rounded-lg">
          <section className="w-full">
            <div
              className={` rounded-md p-2 cursor-pointer ${
                isTranscriptionView &&
                "font-bold bg-[#183153] dark:bg-white dark:text-black text-white"
              }`}
              onClick={toggleView}
            >
              Transcription
            </div>
          </section>
          <section className="w-full">
            <div
              className={`p-2 cursor-pointer rounded-lg ${
                !isTranscriptionView &&
                "font-bold bg-[#183153] dark:bg-white dark:text-black text-white"
              }`}
              onClick={toggleView}
            >
              Translation
            </div>
          </section>
        </section>
        <p className="mt-10">
          {isTranscriptionView ? (
            <section className="flex   justify-between gap-5 text-2xl text-left flex-col h-fit p-5 border pb-10 border-[#183153]  dark:border-white rounded-lg">
              <section className="flex   h-[150px] w-full items-center    ">
                <p className="select-none text-center">{transcript} </p>
              </section>
              <section className="flex  w-full justify-between text-lg  ">
                {countWords(transcript)} Words
                <section className="flex gap-3 ">
                  <IoMdDownload
                    className="cursor-pointer"
                    onClick={() => downloadTranscript(transcript)}
                  />
                  <FaRegCopy
                    className="cursor-pointer"
                    onClick={() => copyText(transcript)}
                  />
                </section>
              </section>
            </section>
          ) : (
            <Translation
              setSelectedLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
              translation={translation}
            />
          )}
        </p>
      </section>
    </>
  );
};

export default Transcript;
