"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Paragraph, {
  Objective,
  ParagraphHeading,
  ParagraphSubHeading,
  Section,
} from "./components";
import { report1, report2 } from "./components/data"; // Assuming report2 is defined similarly to report1

export default function ResponsiveTabs() {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-center py-10">Reports</h2>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        {/* Tab List */}
        <TabsList className="flex justify-between bg-gray-100 rounded-md p-1">
          <TabsTrigger
            value="tab1"
            className={`w-full text-center p-2 ${selectedTab === "tab1" ? "bg-white" : "bg-gray-200"} rounded-md`}
          >
            Report 1
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className={`w-full text-center p-2 ${selectedTab === "tab2" ? "bg-white" : "bg-gray-200"} rounded-md`}
          >
            Report 2
          </TabsTrigger>
        </TabsList>

        {/* Tab Content for Report 1 */}
        <TabsContent value="tab1">
          <div className="p-8 bg-white shadow-md rounded-md">
            {report1.sections.map((section, idx) => (
              <Section key={idx} title={section.title}>
                {section.content.map((item, itemIdx) => {
                  switch (item.type) {
                    case "heading":
                      return <ParagraphHeading key={itemIdx}>{item.text}</ParagraphHeading>;
                    case "subheading":
                      return <ParagraphSubHeading key={itemIdx}>{item.text}</ParagraphSubHeading>;
                    case "paragraph":
                      return <Paragraph key={itemIdx}>{item.text}</Paragraph>;
                    case "objective":
                      return <Objective key={itemIdx} number={item.number} text={item.text} />;
                    default:
                      return null;
                  }
                })}
              </Section>
            ))}
          </div>
        </TabsContent>

        {/* Tab Content for Report 2 */}
        <TabsContent value="tab2">
          <div className="p-4 bg-white shadow-md rounded-md">
          {report2.sections.map((section, idx) => (
              <Section key={idx} title={section.title}>
                {section.content.map((item, itemIdx) => {
                  switch (item.type) {
                    case "heading":
                      return <ParagraphHeading key={itemIdx}>{item.text}</ParagraphHeading>;
                    case "subheading":
                      return <ParagraphSubHeading key={itemIdx}>{item.text}</ParagraphSubHeading>;
                    case "paragraph":
                      return <Paragraph key={itemIdx}>{item.text}</Paragraph>;
                    case "objective":
                      return <Objective key={itemIdx} number={item.number} text={item.text} />;
                    default:
                      return null;
                  }
                })}
              </Section>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
