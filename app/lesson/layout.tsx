type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default LessonLayout;