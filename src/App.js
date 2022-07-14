import React, { useEffect, useState } from "react";

const List = ({ list }) => {
  console.log("list renders", list);
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} {...item} />
      ))}
    </ul>
  );
};

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const InputWithLabel = ({ id, label, value, onChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input id={id} type="text" value={value} onChange={onChange} />
  </>
);

const App = () => {
  console.log("app renders");
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

export default App;
