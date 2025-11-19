import { Button } from "@/components/ui/button"; 

const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]"> 
      <Button>default</Button>
      <Button variant="primary">Primary</Button> 
      <Button variant ="primaryOutline">Primary Outline</Button> 
      <Button variant="secondary">secondary</Button> 
      <Button variant ="secondaryOutline">secondary Outline</Button> 
      <Button variant="danger">danger</Button> 
      <Button variant ="dangerOutline">danger Outline</Button> 
      <Button variant="super">super</Button> 
      <Button variant ="superOutline">super Outline</Button> 
      <Button variant ="ghost">ghost</Button> 
      <Button variant="sidebar">sidebar</Button> 
      <Button variant ="sidebarOutline">sidebar Outline</Button> 

      <Button variant="dark">dark</Button> 
      <Button variant ="darkOutline">dark Outline</Button> 
      <Button variant ="night">night</Button> 
      <Button variant="shadow">shadow</Button> 
      <Button variant ="abyss">abyss</Button> 

      <Button variant ="frostbite">frostbite</Button> 
      <Button variant="hologram">hologram</Button> 
      <Button variant ="infernal">infernal</Button> 
      <Button variant="plasma">plasma</Button> 
      <Button variant ="cyberpunk">cyberpunk</Button> 
      <Button variant="arcane">arcane</Button> 
      <Button variant ="voidPulse">voidPulse</Button> 
      <Button variant ="liquidMetal">liquidMetal</Button> 
      <Button variant="solarFlare">solarFlare</Button> 
      <Button variant ="phantom">phantom</Button> 
      </div>
  );
};

export default ButtonsPage;
