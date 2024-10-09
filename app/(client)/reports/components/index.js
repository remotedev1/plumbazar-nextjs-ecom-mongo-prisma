"use client";
export const BlogPost = ({ title, date, author, content }) => {
  return (
    <div className="blog-post max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {author} | {new Date(date).toLocaleDateString()}
      </p>
      <div className="content text-gray-700">{content}</div>
    </div>
  );
};

export const Section = ({ title, children }) => {
  return (
    <div className="section mb-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export const Objective = ({ number, text }) => {
  return (
    <div className="objective mb-2">
      <strong>{number}. </strong>
      {text}
    </div>
  );
};
