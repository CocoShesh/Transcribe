import React, { useMemo } from "react";
import { languages } from "../../utils/Data";
import {
  countWords,
  copyText,
  downloadTranscript,
} from "../../utils/WordUtils";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";

export interface TranslationItem {
  translations: {
    text: string;
  }[];
}

interface languageProps {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  translation: TranslationItem[];
}

const Translation = ({
  selectedLanguage,
  setSelectedLanguage,
  translation,
}: languageProps) => {
  const handleSelectedLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const totalWordCount = useMemo(
    () =>
      translation.reduce(
        (acc, item) => acc + countWords(item.translations[0].text),
        0
      ),
    [translation]
  );
  const allTranslatedText = translation
    .map(item => item.translations[0].text)
    .join("\n");

  const handleCopyText = () => {
    copyText(allTranslatedText);
  };

  return (
    <>
      <section className="flex flex-col  gap-10 h-full w-full p-5 text-xl border-2   border-[#183153] dark:border-white rounded-lg ">
        <section className="flex   h-[100px] w-full items-center    ">
          <select
            name="language"
            id="language"
            className="w-[200px] h-10 ml-auto border px-5 dark:bg-transparent  dark:text-white border-none outline-none"
            value={selectedLanguage}
            onChange={handleSelectedLanguage}
          >
            {languages.map(language => (
              <option
                key={language.id}
                value={language.code}
                className="dark:bg-[#183153] "
              >
                {language.name}
              </option>
            ))}
          </select>
        </section>
        <section className="h-full  pb-10 flex ">
          {translation.map((item, index) => {
            return <div key={index}>{item.translations[0].text}</div>;
          })}
        </section>
        <section className="flex justify-between items-center">
          <span> {totalWordCount} Words </span>
          <section className="flex gap-3 ">
            <IoMdDownload
              className="cursor-pointer"
              onClick={() => downloadTranscript(allTranslatedText)}
            />
            <FaRegCopy className="cursor-pointer" onClick={handleCopyText} />
          </section>
        </section>
      </section>
    </>
  );
};

export default Translation;
