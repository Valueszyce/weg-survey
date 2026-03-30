import { useNavigate } from "react-router-dom";
import { archetypes } from "@/data/archetypes";
import logo from "@/assets/valueships-logo.png";

const letterColor = (l: string) =>
  l === "L" ? "text-maturity-l" : l === "M" ? "text-maturity-m" : "text-maturity-h";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-t-4 border-primary">
        <div className="container max-w-5xl py-10">
          <img src={logo} alt="Valueships" className="h-8 mb-6" />
          <h1 className="text-2xl font-extrabold text-foreground mb-2">
            Pricing Archetype Selector
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Select an archetype to open its result page. Copy the URL from your browser and send it to the client.
          </p>
        </div>
      </div>

      <div className="container max-w-5xl py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {archetypes.map((a) => (
            <div
              key={a.code}
              onClick={() => navigate(`/result/${a.code}`)}
              className="bg-card rounded-lg border p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-lg font-bold tracking-wider">
                  {a.code.split("").map((l, i) => (
                    <span key={i} className={letterColor(l)}>{l}</span>
                  ))}
                </span>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-bold">
                  {a.class}
                </span>
              </div>
              <p className="font-semibold text-sm text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{a.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.leakage_range}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
