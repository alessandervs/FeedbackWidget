import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

import smileyUrl from '../../assets/smiley.svg'
import smileyStickerUrl from '../../assets/smiley-sticker.svg'
import smileymehUrl from '../../assets/smiley-meh.svg'
import smileysadUrl from '../../assets/smiley-sad.svg'

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes ={
  BUG: {
    title:'Problema',
    image:{
      source: bugImageUrl,
      alt:'Imagem do inseto'
    }

  },
  IDEA: {
    title:'Ideia',
    image:{
      source: ideaImageUrl,
      alt:'Imagem da lampada'
    }

  },
  OTHER: {
    title:'Outro',
    image:{
      source: thoughtImageUrl,
      alt:'Imagem de uma nuvem de pansamento'
    }

  }
}

export const satisfactionTypes ={
  MS: {
    image:{
      source: smileyUrl,
      alt:'Muito Satisfeito'
    }

  },
  SA: {
    image:{
      source: smileyStickerUrl,
      alt:'Satisfeito'
    }

  },
  NT: {
    image:{
      source: smileymehUrl,
      alt:'Neutro'
    }

  },
  IN: {
    image:{
      source: smileysadUrl,
      alt:'Insatisfeito'
    }

  }
}

export type FeedbackType = keyof typeof feedbackTypes;
export type SatisfactionType = keyof typeof satisfactionTypes;

export function WidgetForm(){
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [satisfactionType, setSatisfactionType] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [satisfactionSent, sentSatisfactionSent] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedbackType(null)
    setSatisfactionType('')
  }

  return (

    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
           
       { feedbackSent ? (
         <FeedbackSuccessStep
         onFeedbackRestartRequested={handleRestartFeedback}
         />
       ) : (
         <>
          {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
            ): (
              <FeedbackContentStep
                feedbackType={feedbackType}
                satisfactionType={satisfactionType as SatisfactionType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={()=> setFeedbackSent(true)}
              />
          )}
         </>
       )}

      <footer className="text-xs text-neutral-400">
      Feito com ??? pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}