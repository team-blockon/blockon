import axios from "axios";

/**
 * 바이너리 PDF 파일을 반환받는다.
 * @param data 계약서 폼 데이터
 */
export function getFilledPDF(data) {
  axios
    .post("http://localhost:8000/api/pdf", data, {
      // raw data로 응답받음. 데이터 조작이 필요하지 않으므로 arraybuffer 대신 blob 사용
      responseType: "blob"
    })
    .then(res => {
      // PDF URL 생성 후 다운로드
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    });
}
