import { supportData } from "./supportData";
import PageHeading from "@/components/PageHeading/PageHeading";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function CustomCard({ title, children } : { title: string, children: React.ReactNode }) {
  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl pb-0">{title}</CardHeader>
      <CardBody className="text-zinc-300">{children}</CardBody>
    </Card>
  );
}

function CustomGrid({ children } : { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      {children}
    </div>
  );
}

function SectionTitle({ title } : { title: string }) {
  return (
    <h1 className="text-2xl mb-3 font-bold">{title}</h1>
  );
}

function SectionSubtitle({ title } : { title: string }) {
  return (
    <h2 className="text-zinc-500 mb-3 text-sm">{title}</h2>
  );
}

export default function Support() {
  return (
    <>
      <PageHeading title="Support" />
      <p className="text-zinc-500 mb-5">We're here to help! You can find answers to common questions about the Workout Tracker below. If you can't find what you're looking for, you can contact our support team using the form at the bottom of the page.</p>

      {supportData.map((section, index) => (
        <div key={index}>
          <SectionTitle title={section.title} />
          <SectionSubtitle title={section.subtitle} />
          <CustomGrid>
            {section.cards.map((card, cardIndex) => (
              <CustomCard key={cardIndex} title={card.title}>{card.content}</CustomCard>
            ))}
          </CustomGrid>
        </div>
      ))}
    </>
  );
}
