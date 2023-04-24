import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortPostsData() {
  // posts以下のファイル名取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名から".md "を削除してidを取得する
    const id = fileName.replace(/\.md$/, '');

    // マークダウンファイルを文字列として読み込む
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // グレイマターを使って投稿のメタデータ部分を解析する
    const matterResult = matter(fileContents);

    // データをidで結合する
    return {
      id,
      ...matterResult.data,
    };
  });

  // 投稿を日付順に並べる
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}