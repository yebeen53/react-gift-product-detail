import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '@/schemas/orderSchema';
import type { OrderFormData } from '@/schemas/orderSchema';
import { FormProvider } from 'react-hook-form';

import useRequireAuth from '@/hooks/useRequireAuth';
import useCustomTheme from '@/hooks/useCustomTheme';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CardSelector from '@/components/order/CardSelector';
import MessageInput from '@/components/order/MessageInput';
import SenderInput from '@/components/order/SenderInput';
import RecipientSummary from '@/components/order/RecipientSummary';
import RecipientModal from '@/components/order/RecipientModal';
import PriceSummary from '@/components/order/PriceSummary';

import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import ProductSummary from '@/components/order/ProductSummary';
import { isClientRequestError, isServerError } from '@/utils/http';
import { HttpStatusCode } from 'axios';
import { ROUTES } from '@/constants/routes';

type ProductInfo = {
  name: string;
  description: string;
  price: number;
  brandName?: string;
  imageURL?: string;
};

const OrderPage = () => {
  const user = useRequireAuth();
  const { user: userInfo } = useAuth();
  const theme = useCustomTheme();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const [summaryRes, detailRes] = await Promise.all([
          axios.get(`/api/products/${productId}/summary`),
          axios.get(`/api/products/${productId}/detail`),
        ]);

        const summary = summaryRes.data.data;
        const detail = detailRes.data.data;

        setProduct({
          name: summary.name,
          price: summary.price,
          description: detail.description,
          brandName: summary.brandName,
          imageURL: summary.imageURL,
        });
        setProductPrice(summary.price);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          axios.isAxiosError(error) &&
          isClientRequestError(error)
        ) {
          toast.error('상품 정보를 불러오지 못했습니다.');
          navigate(ROUTES.HOME);
        } else {
          toast.error('서버 오류가 발생했습니다.');
        }
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: {
      message: '축하해요.',
      senderName: userInfo?.name || '',
      selectedCardId: 'card904',
      recipients: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipients',
  });

  const selectedCardId = watch('selectedCardId');
  const recipients = watch('recipients');

  if (!user) return null;

  const totalQuantity = recipients.reduce(
    (sum, r) => sum + Number(r.quantity || 0),
    0
  );
  const totalPrice = totalQuantity * productPrice;

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      toast.error('인증 정보가 없습니다.');
      navigate(ROUTES.HOME);
      return;
    }

    try {
      await axios.post(
        '/api/order',
        {
          productId: Number(productId),
          message: data.message,
          messageCardId: `card${data.selectedCardId}`,
          ordererName: data.senderName,
          receivers: data.recipients.map((r) => ({
            name: r.name,
            phoneNumber: r.phoneNumber,
            quantity: Number(r.quantity),
          })),
        },
        {
          headers: {
            Authorization: `${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(
        <div>
          주문이 완료되었습니다.
          <br />
          구매 수량:{totalQuantity}
          <br />
          발신자 이름:{data.senderName}
          <br />
          메시지:{data.message}
        </div>
      );

      navigate(ROUTES.HOME);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response!.status;
        if (isClientRequestError(error)) {
          if (status === HttpStatusCode.Unauthorized) {
            toast.error('로그인이 필요합니다.');
            navigate(ROUTES.HOME);
          } else {
            toast.error(error.response?.data.message || '주문에 실패했습니다.');
          }
        } else if (isServerError(error)) {
          toast.error('서버 오류가 발생했습니다.');
        } else {
          toast.error('네트워크 오류가 발생했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={{
          maxWidth: '720px',
          margin: 'auto',
          padding: theme.spacing.spacing5,
        }}
      >
        <CardSelector
          selectedCardId={selectedCardId}
          setValue={setValue}
          theme={theme}
        />

        <MessageInput
          register={register}
          error={errors.message}
          theme={theme}
        />

        <SenderInput
          register={register}
          error={errors.senderName}
          theme={theme}
        />

        <RecipientSummary
          recipients={recipients}
          errors={errors.recipients}
          setModalOpen={setModalOpen}
          theme={theme}
        />

        {isModalOpen && (
          <RecipientModal
            fields={fields}
            register={register}
            errors={errors}
            append={append}
            remove={remove}
            theme={theme}
            setModalOpen={setModalOpen}
            setValue={setValue}
          />
        )}
        {product && <ProductSummary product={product} theme={theme} />}
        <PriceSummary
          totalPrice={totalPrice}
          theme={theme}
          onOrder={handleSubmit(onSubmit)}
        />
      </form>
    </FormProvider>
  );
};

export default OrderPage;
