import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@repo/ui/components/navigation-menu";

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2">
              <li>
                <NavigationMenuLink render={<a href="#">Introduction</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Installation</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Quick Start</a>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 w-[200px]">
              <li>
                <NavigationMenuLink render={<a href="#">Button</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Card</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Dialog</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Table</a>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#">Documentation</a>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#">Home</a>} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#">About</a>} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#">Contact</a>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    ),
  },
};

export const WithDropdowns: Story = {
  args: {
    children: (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2">
              <li>
                <NavigationMenuLink render={<a href="#">Electronics</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Clothing</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Accessories</a>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2">
              <li>
                <NavigationMenuLink render={<a href="#">Consulting</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Development</a>} />
              </li>
              <li>
                <NavigationMenuLink render={<a href="#">Support</a>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    ),
  },
};
