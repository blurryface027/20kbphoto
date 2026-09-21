import { BlogVisualChart } from "@/data/blog/types";
import { HiOutlineArrowRight } from "react-icons/hi2";

interface VisualDiagramProps {
  chart: BlogVisualChart;
}

export default function VisualDiagram({ chart }: VisualDiagramProps) {
  if (!chart || !chart.items || chart.items.length === 0) return null;

  return (
    <div className="my-8 bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
      <div className="mb-4 pb-3 border-b border-slate-800">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          {chart.title}
        </h4>
        {chart.description && (
          <p className="text-xs text-slate-400 mt-1">{chart.description}</p>
        )}
      </div>

      {chart.type === "flow" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto py-2">
          {chart.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <div
                className={`p-3.5 rounded-xl border text-center flex-1 sm:flex-initial min-w-[130px] ${
                  item.highlight
                    ? "bg-indigo-600/30 border-indigo-400 text-white shadow-sm"
                    : "bg-slate-800/80 border-slate-700 text-slate-200"
                }`}
              >
                {item.value && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 block mb-1">
                    {item.value}
                  </span>
                )}
                <div className="text-xs font-bold">{item.label}</div>
                {item.sublabel && (
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.sublabel}</div>
                )}
              </div>
              {index < chart.items.length - 1 && (
                <HiOutlineArrowRight className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      )}

      {chart.type === "comparison" && (
        <div className="space-y-3">
          {chart.items.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-200">{item.label}</span>
                <span className="text-indigo-300 font-bold">{item.value}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.highlight ? "bg-indigo-500" : "bg-slate-600"
                  }`}
                  style={{ width: `${Math.max(20, 100 - index * 25)}%` }}
                />
              </div>
              {item.sublabel && (
                <span className="text-[11px] text-slate-400 block">{item.sublabel}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {chart.type === "matrix" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chart.items.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                item.highlight
                  ? "bg-indigo-950/60 border-indigo-500/50 text-white"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-300"
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
                {item.value}
              </span>
              <div className="text-sm font-bold">{item.label}</div>
              {item.sublabel && (
                <div className="text-xs text-slate-400 mt-1">{item.sublabel}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {chart.type === "steps" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chart.items.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border relative overflow-hidden ${
                item.highlight
                  ? "bg-indigo-900/50 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <div className="text-2xl font-extrabold text-slate-700/50 absolute top-2 right-3">
                0{index + 1}
              </div>
              <div className="text-xs font-bold text-indigo-300 mb-1">{item.value}</div>
              <div className="text-xs font-bold text-white relative z-10">{item.label}</div>
              {item.sublabel && (
                <div className="text-[11px] text-slate-400 mt-1 relative z-10">{item.sublabel}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
