import { Github, Moon, Sun } from "lucide-react"
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { VideoInputForm } from "./components/videoInputForm";
import { GenerationInputForm } from "./components/generationInputForm";
import { useState } from "react";
import { useCompletion } from "ai/react"
import { useTheme } from "./theme/themeProvider";

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0.5);
  const { theme, setTheme } = useTheme();

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      id: videoId,
      temperature,
      prompt
    },
    headers: {
      "Content-Type": "application/json"
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido com ☕ no NLW da RocketSeat</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2"/>
            GitHub
          </Button>

          <Button 
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light")
            }} 
            variant="outline"
          >
            {theme === "light" ? (
              <Moon className="fill-primary text-primary"/>
            ) : (
              <Sun className="fill-primary text-primary" />
            )}
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..." 
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-primary/70">{`{transcription}`}</code> no seu prompt para adicionar a transcrição do vídeo selecionado
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId}/>

          <Separator />

          <GenerationInputForm 
            onSubmit={handleSubmit} 
            onPromptSelected={setInput} 
            temperature={temperature} 
            setTemperature={setTemperature}
          />

        </aside>
      </main>
    </div>
  )
}
