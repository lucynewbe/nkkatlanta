export default function PageHeader({ tag, title, accent, subtitle, children }) {
  return (
    <header className="page-header">
      {tag && <div className="page-tag">{tag}</div>}
      <h1 className="page-title">
        {title}{accent ? <> <span className="gradient-text">{accent}</span></> : null}
      </h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      <hr className="silk-rule" />
      {children}
    </header>
  );
}
