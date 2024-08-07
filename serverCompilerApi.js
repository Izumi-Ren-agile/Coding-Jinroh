const fetch = require("node-fetch");

/**
 * 
 * @param {language,sourceCode} props 言語とソースコードを入力
 * @returns Sysoutの結果と、コンパイルエラーがhtmlタグに包まれて返却
 */
const compileCode = async (language, sourceCode, input) => {
  const sourceCodeForURL = encodeURIComponent(sourceCode);
  const urlForPost = input?
  `http://api.paiza.io:80/runners/create?source_code=${sourceCodeForURL}&language=${language}&input=${input}&api_key=guest`
:`http://api.paiza.io:80/runners/create?source_code=${sourceCodeForURL}&language=${language}&input=${input}&api_key=guest`;

  try {
    // コンパイルIDを取得するためのPOSTリクエスト
    const postResponse = await fetch(urlForPost, { method: "POST" });
    const postResult = await postResponse.json();
    const id = postResult.id;

    // コンパイルIDを使い、getでコンパイル結果を取得する関数
    const getCompiledData = async () => {
      const urlForGet = `http://api.paiza.io/runners/get_details?id=${id}&api_key=guest`;
      // console.log(urlForGet);
      let jsonData;

      //コンパイルが終わるまでurlにアクセスして結果の取得することを繰り返す
      while (true) {
        const getResponse = await fetch(urlForGet);
        jsonData = await getResponse.json();
        //コンパイルが完了したらループを抜ける
        if (jsonData.status === "completed") {
          break;
        }
        // 1秒後に再度チェック
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機して再試行
      }

      return jsonData;
    };

    return await getCompiledData();
  } catch (error) {
    throw new Error("コンパイル中にエラーが発生しました: " + error.message);
  }
};

module.exports = { compileCode };
