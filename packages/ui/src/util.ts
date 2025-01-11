export function isCurrentRoute(basePath: string, currentPath: string): boolean {
  // 경로 끝의 '/' 제거
  const normalizedBasePath = basePath.replace(/\/$/, '');
  const normalizedCurrentPath = currentPath.replace(/\/$/, '');

  // 루트 경로('/')에 대한 특별 처리
  if (normalizedBasePath === '' && normalizedCurrentPath !== '') {
    return false;
  }

  // 정확히 일치하거나 서브경로인 경우 true 반환
  return normalizedCurrentPath === normalizedBasePath || 
         normalizedCurrentPath.startsWith(normalizedBasePath + '/');
}