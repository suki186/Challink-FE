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

  // 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (isLoading || (!isFirstLoad && !hasMore)) return;

    setIsLoading(true);
    try {
      // 페이지 번호와 사이즈
      const data = await apiFunction({ page: currentPage, page_size: PAGE_SIZE });
      setItems((prev) => [...prev, ...data.items]);
      setTotal(data.total);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, isFirstLoad, currentPage, apiFunction]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && (isFirstLoad || hasMore)) {
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
  }, [isLoading, hasMore, isFirstLoad, loadMore]);

  // 목록 리셋 함수
  const reset = useCallback(() => {
    setItems([]);
    setCurrentPage(1);
    setTotal(0);
    setIsLoading(false);
  }, []);

  return {
    items,
    isLoading,
    hasMore,
    triggerRef,
    reset,
    loadFirstPage: () => loadMore(1),
  };
};
