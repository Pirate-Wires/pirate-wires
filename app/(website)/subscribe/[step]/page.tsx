import React from "react";
import { notFound } from 'next/navigation'

import {getGlobalFields, getPodcastData, getSettings} from "@/lib/sanity/client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import {urlForImage} from "@/lib/sanity/image";
export async function generateMetadata({ params }) {
  const settings = await getSettings();
  const title = "Subscribe | Pirate Wires"
  const description = settings.meta_description
  const image = urlForImage(settings?.openGraphImage)?.src

  return { title: title, description: description, openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ]
    }};
}
export default async function SubscribePage({ params }) {
  const globalFields = await getGlobalFields();

  const StepSwitcher = ({currentStep}) => {
    console.log(currentStep);
    switch (currentStep) {
      case 'step-1':
        return <StepOne />
      case 'step-2':
        return <StepTwo />
      case 'step-3':
        return <StepThree />
      case 'step-4':
        return <StepFour />
      default:
        return notFound();
    }
  }

  return <div className="colorWrapper reducedHeaderPage" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <StepSwitcher currentStep={params.step} />
    <Footer globalFields={globalFields} />
  </div>
}
