import { useState, useRef, useCallback, useEffect } from 'react';

const PAGE_SIZE = 10;

// Intersection Observer를 사용한 무한 스크롤 훅
export const useInfiniteScroll = (apiFunction) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const triggerRef = useRef(null);

  const hasMore = items.length < total; // 더 불러올 데이터가 있는지
  const isFirstLoad = currentPage === 1; // 첫 로드인지

  const stateRef = useRef({ isLoading, hasMore, isFirstLoad, currentPage });

  // ref의 값을 최신 state로 업데이트
  useEffect(() => {
    stateRef.current = { isLoading, hasMore, isFirstLoad, currentPage };
  }, [isLoading, hasMore, isFirstLoad, currentPage]);

  // 데이터 로드 함수
  const loadMore = useCallback(async () => {
    const { isLoading, hasMore, isFirstLoad, currentPage } = stateRef.current;

    if (isLoading || (!isFirstLoad && !hasMore)) return;

    setIsLoading(true);
    try {
      // 페이지 번호와 사이즈
      const data = await apiFunction({ page: currentPage, page_size: PAGE_SIZE });
      console.log(`${currentPage} 조회 성공`, data);

      setItems((prev) => [...prev, ...data.items]);
      setTotal(data.total);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    const el = triggerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadMore]);

  // 목록 리셋 함수
  const reset = useCallback(() => {
    setItems([]);
    setCurrentPage(1);
    setTotal(0);
    setIsLoading(false);
  }, []);

  // 첫 페이지 로드 함수
  const loadFirstPage = useCallback(async () => {
    if (stateRef.current.isLoading) return; // 로딩 중이면 중복 방지
    setIsLoading(true);
    try {
      const data = await apiFunction({ page: 1, page_size: PAGE_SIZE });
      setItems(data.items); // 첫 페이지는 덮어쓰기
      setTotal(data.total);
      setCurrentPage(2); // 다음 페이지는 2
    } catch (error) {
      console.error('Failed to fetch first page:', error);
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction]);

  return {
    items,
    isLoading,
    hasMore,
    triggerRef,
    reset,
    loadFirstPage: loadFirstPage,
  };
};
