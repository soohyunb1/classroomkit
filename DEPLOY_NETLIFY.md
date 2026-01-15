# Netlify 배포 가이드

이 문서는 이 웹 애플리케이션을 [Netlify](https://www.netlify.com/)를 통해 배포하는 방법을 안내합니다.

## 배포 전 필수 준비사항 (가장 중요!)

**현재 사용자 컴퓨터에 `Node.js`가 설치되어 있지 않은 것으로 보입니다.**
이 웹앱을 실행하거나 빌드하려면 **반드시** Node.js를 먼저 설치해야 합니다.

1.  **Node.js 설치**:
    - [Node.js 공식 홈페이지](https://nodejs.org/ko/)에 접속합니다.
    - **LTS 버전** (안정적 버전)을 다운로드하여 설치합니다.
    - 설치가 완료되면 컴퓨터(또는 에디터)를 재부팅해주세요.

2.  **설치 확인**:
    - 터미널을 열고 `npm -v`를 입력했을 때 숫자가 나오면 성공입니다.

3.  **`netlify.toml` 설정 확인**: (기존 내용 유지)
    - 프로젝트 루트에 `netlify.toml` 파일이 생성되어 있습니다.


---

## 배포 방법 1: GitHub 연동 (권장)

가장 자동화되고 관리가 쉬운 방법입니다.

1. **GitHub 저장소 생성**: 이 프로젝트를 GitHub에 Push합니다.
2. **Netlify 접속 및 로그인**: [Netlify](https://www.netlify.com/)에 로그인합니다.
3. **'Add new site' 클릭**: 대시보드에서 'Import from existing project'를 선택합니다.
4. **GitHub 연결**: GitHub를 선택하고, 방금 올린 저장소를 선택합니다.
5. **빌드 설정 확인**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - *이미 `netlify.toml` 파일이 있어 자동으로 설정될 것입니다.*
6. **환경 변수 설정 (필요시)**:
   - 'Show advanced' 또는 'Environment variables' 섹션에서 `GEMINI_API_KEY`와 값을 입력합니다.
7. **'Deploy site' 클릭**: 배포가 시작됩니다.

## 배포 방법 2: 수동 업로드 (Netlify Drop)

GitHub 없이 로컬에서 빌드 후 결과물만 올리는 방법입니다.

1. **로컬 빌드**:
   터미널에서 다음 명령어를 실행하여 빌드 파일을 생성합니다.
   ```bash
   npm install
   npm run build
   ```
2. **dist 폴더 확인**: 프로젝트 폴더 안에 `dist` 폴더가 생성되었는지 확인합니다.
3. **Netlify Drop 접속**: [Netlify Drop](https://app.netlify.com/drop)으로 이동합니다 (로그인 상태).
4. **폴더 드래그 앤 드롭**: 생성된 `dist` 폴더를 브라우저의 업로드 영역으로 드래그합니다.
5. **배포 완료**: 즉시 배포되며 URL이 생성됩니다.

---

## 문제 해결

- **빌드 실패 시**: `npm run build`가 로컬에서 정상적으로 작동하는지 확인하세요. 의존성 문제일 수 있으니 `node_modules`를 삭제하고 `npm install`을 다시 해보는 것도 방법입니다.
- **페이지가 안 보일 때**: `netlify.toml`의 `publish = "dist"` 설정이 맞는지, 실제 빌드 폴더가 `dist`인지 확인하세요.
