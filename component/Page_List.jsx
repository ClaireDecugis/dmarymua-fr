import fs from "fs";
import path from "path";

const Page_List = () => {
  const pagesDirectory = path.join(process.cwd(), "pages");
  const pageFiles = fs.readdirSync(pagesDirectory);

  const pageNames = pageFiles
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.replace(".js", ""));

  return (
    <div>
      <h1>Liste des Pages</h1>
      <ul>
        {pageNames.map((pageName) => (
          <li key={pageName}>
            <a href={`/${pageName}`}>{pageName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page_List;
