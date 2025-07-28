import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchProduct,
  fetchProductDetail,
  fetchHighlightReview,
  fetchWishCount,
} from '@/api/products/product';

export const useProduct = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

export const useProductDetail = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });

export const useHighlightReview = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['highlightReview', productId],
    queryFn: () => fetchHighlightReview(productId),
  });

export const useWishCount = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['wishCount', productId],
    queryFn: () => fetchWishCount(productId),
  });

export const useWishMutation = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => Promise.resolve(), // 실제 API 요청 함수 넣기

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['wishCount', productId] });

      const prevWish = queryClient.getQueryData<{
        wishCount: number;
        isWished: boolean;
      }>(['wishCount', productId]);

      if (prevWish) {
        queryClient.setQueryData(['wishCount', productId], {
          ...prevWish,

          wishCount: prevWish.isWished
            ? prevWish.wishCount - 1
            : prevWish.wishCount + 1,
          isWished: !prevWish.isWished, // 토글
        });
      }

      return { prevWish };
    },

    onError: (_err, _vars, context) => {
      if (context?.prevWish) {
        queryClient.setQueryData(['wishCount', productId], context.prevWish);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishCount', productId] });
    },
  });
};
