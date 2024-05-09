import { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { FaMicrophoneAlt, FaArrowRight } from "react-icons/fa";
const index = () => {
  const [isStartRecord, setIsStartRecord] = useState(false);

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsStartRecord(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsStartRecord(false);
  };
  return (
    <>
      <section className="h-screen w-full flex flex-col  gap-5  mt-32 items-center dark:text-white">
        <h1 className="text-[#183153] dark:text-white font-bold text-5xl">
          Tran<span className="text-[#0079ea] ">Scribe</span>
        </h1>
        <section className="flex items-center gap-3   font-semibold">
          <span className="text-lg">Record</span>
          <FaArrowRight className="text-[#0079ea]" />
          <span className="text-lg">Transcribe</span>
          <FaArrowRight className="text-[#0079ea]" />
          <span className="text-lg">Translate</span>
        </section>
        {isStartRecord ? (
          <div
            onClick={stopRecording}
            className="flex items-center w-[400px] cursor-pointer border hover:shadow hover:shadow-[#18315391] p-3 rounded-lg justify-between"
          >
            <h1 className="text-[#183153]  dark:text-[#0079ea] font-semibold text-xl">
              Stop
            </h1>
            <FaMicrophoneAlt />
          </div>
        ) : (
          <div
            onClick={startRecording}
            className="flex items-center w-[400px] cursor-pointer border hover:shadow hover:shadow-[#18315391] p-3 rounded-lg justify-between"
          >
            <h1 className="text-[#183153]  dark:text-[#0079ea] font-semibold text-xl">
              Record
            </h1>
            <FaMicrophoneAlt />
          </div>
        )}
        {!browserSupportsSpeechRecognition && (
          <div className="w-[400px] mt-5 text-center">
            Browser doesn't support speech recognition. Sorry for the
            inconvenience. Soon I will implement cross-browser support, but for
            now, try another browser.
          </div>
        )}
      </section>
    </>
  );
};

export default index;
