import { ArrowLeft} from "phosphor-react"
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes, satisfactionTypes, SatisfactionType } from ".."
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  satisfactionType: SatisfactionType
  onFeedbackRestartRequested: ()=> void;
  onFeedbackSent: ()=> void;

}


export function FeedbackContentStep({
  onFeedbackSent,
  feedbackType,
  satisfactionType,
  onFeedbackRestartRequested}: FeedbackContentStepProps){
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const satisfactionTypeInfo = satisfactionTypes[satisfactionType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [satisfactionLevel, setSatisfactionLevel]= useState<typeof satisfactionType | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault()

    setIsSendingFeedback(true)
    // console.log({
    //   screenshot,
    //   comment,
    //   satisfactionLevel,
    // })

    await api.post('/feedbacks',{
      type: feedbackType,
      comment,
      screenshot,
      satisfaction:satisfactionLevel,
    })

    setIsSendingFeedback(false)

    onFeedbackSent()
  }
  return(
    <>
    <header>
      <button
        type="button"
        onClick={onFeedbackRestartRequested}
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        title="Voltar"
      >
        <ArrowLeft weight="bold" className="w-4 h-4"/>
      </button>

      <span className="text-xl leading-6 flex items-center gap-2">
        <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
        {feedbackTypeInfo.title}
      </span>

      <CloseButton/>
    </header>
    <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
      <textarea
      className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
      placeholder="Conte com detalhes o que está acontecendo..."
      onChange={event => setComment(event.target.value)}
      />
      <span className="flex mt-2 gap-12 items-center justify-center">
      {
           Object.entries(satisfactionTypes).map(([key, value]) =>{
            return (
              <button
                key={key}
                className="flex flex-col items-center gap-2 w-8 h-8 p-2 bg-brand-500 rounded-md border-transparent hover:bg-brand-300 focus:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
                type="button"
                onClick={()=> setSatisfactionLevel(key as SatisfactionType)}>
                <img src={value.image.source} alt={value.image.alt}/>
                <span className="text-xs my-1">{value.image.alt}</span>
              </button>
            )
        })
      }
      </span>
    <footer className="flex gap-2 mt-10">
      <ScreenShotButton
        screenshot={screenshot}
        onScreenshotTook={setScreenshot}
      />
      <button
        type="submit"
        disabled={comment.length === 0 && !satisfactionLevel || isSendingFeedback}
        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
      >
        { isSendingFeedback? <Loading/> :'Enviar Feedback'}
      </button>    
    </footer>     
    </form>
    </>
  )
}