const GlowingButton = ({ label, icon, onClick, type = 'primary' }) => {
  const baseClasses = "px-6 py-3 font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2";
  
  const typeClasses = {
    primary: "bg-primary text-secondary hover:shadow-glow-cyan",
    outline: "border-2 border-primary text-primary hover:bg-primary/20",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${typeClasses[type]}`}>
      {label}
      {icon && <i className={icon}></i>}
    </button>
  );
};

export default GlowingButton;