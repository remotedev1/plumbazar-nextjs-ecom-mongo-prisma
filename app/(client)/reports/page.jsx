"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Paragraph, {
  BlogPost,
  Objective,
  ParagraphHeading,
  ParagraphSubHeading,
  Section,
} from "./components";
import blogContent from "./components/data";

export default function ResponsiveTabs() {
  const title = "Complete Guide to Materials Procurement in Construction";
  const date = "2024-06-01";
  const author = "Deb Dulal Das";

  // Initialize content state
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Simulate a data fetch or complex calculation
    const sectionContent = blogContent.sections.map((section, index) => (
      <Section key={index} title={section.title}>
        {section.content.map((item, idx) => {
          switch (item.type) {
            case "heading":
              return <ParagraphHeading key={idx}>{item.text}</ParagraphHeading>;
            case "subheading":
              return (
                <ParagraphSubHeading key={idx} >
                  {item.text}
                </ParagraphSubHeading>
              );
            case "paragraph":
              return <Paragraph key={idx}>{item.text}</Paragraph>;
            case "objective":
              return (
                <Objective key={idx} number={item.number} text={item.text} />
              );
            default:
              return null;
          }
        })}
      </Section>
    ));

    setContent(sectionContent); // Set content after fetching
    setLoading(false); // Set loading to false after setting content
  }, []);

  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-center py-10">{title}</h2>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        {/* Tab List */}
        <TabsList className="flex justify-between bg-gray-100 rounded-md p-1">
          <TabsTrigger
            value="tab1"
            className={`w-full text-center p-2 ${
              selectedTab === "tab1" ? "bg-white" : "bg-gray-200"
            } rounded-md`}
          >
            Report 1
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className={`w-full text-center p-2 ${
              selectedTab === "tab2" ? "bg-white" : "bg-gray-200"
            } rounded-md`}
          >
            Report 2
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="tab1">
          <div className="p-4 bg-white shadow-md rounded-md">
            {loading ? (
              <Paragraph>Loading...</Paragraph> // Display loading until content is ready
            ) : (
              <BlogPost
                title={title}
                date={date}
                author={author}
                content={content}
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="p-4 bg-white shadow-md rounded-md">
            Content for Tab 2
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
