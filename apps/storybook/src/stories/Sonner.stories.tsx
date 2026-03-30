import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster } from "@repo/ui/components/sonner";
import { toast } from "sonner";

const meta = {
  title: "Components/Sonner (Toaster)",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ShowSuccessToast: Story = {
  args: {},
  play: () => {
    toast.success("Success!", {
      description: "Your action was completed successfully.",
    });
  },
};

export const ShowErrorToast: Story = {
  args: {},
  play: () => {
    toast.error("Error!", {
      description: "Something went wrong. Please try again.",
    });
  },
};

export const ShowInfoToast: Story = {
  args: {},
  play: () => {
    toast.info("Information", {
      description: "Here's some useful information for you.",
    });
  },
};

export const ShowWarningToast: Story = {
  args: {},
  play: () => {
    toast.warning("Warning!", {
      description: "Please be careful with this action.",
    });
  },
};

export const ShowLoadingToast: Story = {
  args: {},
  play: () => {
    toast.loading("Loading...", {
      description: "Processing your request.",
    });
  },
};

export const ToastWithAction: Story = {
  args: {},
  play: () => {
    toast("Event created", {
      description: "Sunday, December 17, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => toast.info("Undo clicked"),
      },
    });
  },
};

export const MultipleToasts: Story = {
  args: {},
  play: () => {
    toast.success("First toast");
    toast.info("Second toast");
    toast.warning("Third toast");
  },
};

export const CustomToast: Story = {
  args: {},
  play: () => {
    toast("Custom Toast", {
      description: "This is a custom toast message with description.",
    });
  },
};
