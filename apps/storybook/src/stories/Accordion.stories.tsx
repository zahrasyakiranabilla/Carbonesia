import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@repo/ui/components/accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    children: (
      <AccordionItem>
        <AccordionTrigger>Single accordion item</AccordionTrigger>
        <AccordionContent>
          This is a standalone accordion item demonstrating the component on its own.
        </AccordionContent>
      </AccordionItem>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionTrigger>What is Lorem Ipsum?</AccordionTrigger>
          <AccordionContent>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Why do we use it?</AccordionTrigger>
          <AccordionContent>
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};
