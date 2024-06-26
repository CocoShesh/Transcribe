import { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophoneAlt, FaArrowRight } from "react-icons/fa";
import Transcript from "../Transcript";

const Button = () => {
  const [isStartRecord, setIsStartRecord] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const { browserSupportsSpeechRecognition, transcript: currentTranscript } =
    useSpeechRecognition();

  const startRecording = (): void => {
    SpeechRecognition.startListening({ continuous: true });
    setIsStartRecord(true);
  };

  const stopRecording = (): void => {
    SpeechRecognition.stopListening();
    setIsStartRecord(false);
    setTranscript(currentTranscript);
  };

  return (
    <>
      <section className="h-screen w-full flex flex-col gap-5 mt-32 items-center  max-sm:px-3 dark:text-white">
        <h1 className="text-[#183153] dark:text-white font-bold text-5xl">
          Tran<span className="text-[#0079ea] ">Scribe</span>
        </h1>
        <section className="flex items-center gap-3 font-semibold">
          <span className="text-lg">Record</span>
          <FaArrowRight className="text-[#0079ea]" />
          <span className="text-lg">Transcribe</span>
          <FaArrowRight className="text-[#0079ea]" />
          <span className="text-lg">Translate</span>
        </section>
        {!browserSupportsSpeechRecognition ? (
          <div className="w-[400px] mt-5 text-center text-red-500">
            Sorry, the browser does not support speech recognition. I apologize
            for the inconvenience. Cross-browser support will be implemented
            soon, but currently, only Google Chrome and Microsoft Edge is
            supported.
          </div>
        ) : isStartRecord ? (
          <div
            onClick={stopRecording}
            className="flex items-center w-[400px]  max-sm:w-full   cursor-pointer border hover:shadow hover:shadow-[#18315391] p-3 rounded-lg justify-between"
          >
            <h1 className="text-[#183153]  dark:text-[#0079ea] font-semibold text-xl">
              Stop
            </h1>
            <FaMicrophoneAlt />
          </div>
        ) : transcript ? (
          <Transcript transcript={transcript} />
        ) : (
          <div
            onClick={startRecording}
            className="flex items-center w-[400px]  max-sm:w-full   cursor-pointer border hover:shadow hover:shadow-[#18315391] p-3 rounded-lg justify-between"
          >
            <h1 className="text-[#183153]  dark:text-[#0079ea] font-semibold text-xl">
              Record
            </h1>
            <FaMicrophoneAlt />
          </div>
        )}
      </section>
    </>
  );
};

export default Button;
