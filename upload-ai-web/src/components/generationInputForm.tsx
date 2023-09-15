import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { PromptSelect } from "./promptSelect";
import { FormEvent } from "react";

interface GenerationInputFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPromptSelected: (prompt: string) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
}

export function GenerationInputForm({ onSubmit, onPromptSelected, temperature, setTemperature }: GenerationInputFormProps) {
  function handlePromptSelected(selectedTemplate: string) {
    onPromptSelected(selectedTemplate);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Prompt</Label>

        
      </div>

      <div className="space-y-2">
        <Label>Modelo</Label>

        <PromptSelect onPromptSelected={handlePromptSelected} />

        <span className="block text-xs text-muted-foreground italic">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Temperatura</Label>

        <Slider 
          min={0}
          max={1}
          step={0.01}
          value={[temperature]}
          onValueChange={value => setTemperature(value[0])}
        />

        <span className="block text-xs text-muted-foreground italic">
          Valores mais altos tendem a deixar o valor mais criativo e mais suscetíveis a erros
        </span>
      </div>

      <Separator />

      <Button type="submit" className="w-full">
        <Wand2 className="w-4 h-4 mr-2"/>
        Executar
      </Button>
    </form>
  );
}