import React, { useState, useEffect } from "react";
/**
 * 
 * @param {language,sourceCode} props 言語とソースコードを持ったオブジェクト
 * @returns sysoutの結果とコンパイルエラーを含んだオブジェクト
 */
export const Compiler = (props) => {
  const { language, sourceCode } = props;
  const sourceCodeForURL = encodeURIComponent(sourceCode);
  const [stdout, setStdout] = useState(null);
  const [buildStderr, setBuildStderr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlForPost =
      `http://api.paiza.io:80/runners/create?source_code=${sourceCodeForURL}&language=${language}&api_key=guest`;

    const fetchData = async () => {
      try {
        // POSTリクエストを送信してIDを取得
        const postResponse = await fetch(urlForPost, { method: "POST" });
        const postResult = await postResponse.json();
        const id = postResult.id;

        // GETリクエストで結果を取得する関数
        const getCompiledData = async () => {
          try {
            const urlForGet = `http://api.paiza.io/runners/get_details?id=${id}&api_key=guest`;

            const checkResult = async () => {
              const getResponse = await fetch(urlForGet);
              const jsonData = await getResponse.json();

              if (jsonData.status === "completed") {
                setStdout(jsonData.stdout);
                setBuildStderr(jsonData.build_stderr);
                console.log("stdout:", jsonData.stdout);
                console.log("build_stderr:", jsonData.build_stderr);
                setLoading(false);
              } else {
                setTimeout(checkResult, 1000); // 1秒後に再度チェック
              }
            };

            checkResult(); // 初回チェックを開始
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };

        getCompiledData(); // コンパイル結果の取得を開始
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // データフェッチを開始
  }, [language, sourceCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    {
        output:stdout,
        buildErrors:buildStderr
    }
  );
};