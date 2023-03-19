import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IProductCart } from '../../components/types/types';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../API/PostService';
import classes from './ProductId.module.scss';
import ConfigurationSelector from '../../components/ConfigurationSelector/ConfigurationSelector';
import { AddProductButton, CommonButton } from '../../components/UI/Button/Button';
import { addProduct } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProductIdSkeleton from '../../components/ProductIdSkeleton/ProductIdSkeleton';

const ProductId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const didUpdate = useRef(false);

  const [product, setProduct] = useState({} as IProduct);
  const [activeMemory, setActiveMemory] = useState<number>(0);
  const [activeColour, setActiveColour] = useState<number>(0);
  const [productForCart, setProductForCart] = useState<IProductCart>({} as IProductCart);

  const dispatch = useAppDispatch();

  const productArr = useAppSelector((state) =>
    state.cart.products.filter((product) => product.id === id),
  );

  const productCount = productArr
    ? productArr.reduce((count, product) => product.count + count, 0)
    : 0;

  const [fetchProduct, isLoading, error] = useFetching(async () => {
    if (id) {
      const product = await PostService.getProductById(id);
      setProduct(product);
    }
  });

  useEffect(() => {
    fetchProduct().then();
  }, []);

  useEffect(() => {
    if (didUpdate.current) {
      setProductForCart({
        id: product.id,
        image: product.image,
        title: product.title,
        memory: product.memory[activeMemory],
        colour: product.colours[activeColour],
        price: product.price,
        count: 1,
      });
    }
    didUpdate.current = true;
  }, [product, activeColour, activeMemory]);

  return (
    <div className={classes.productIdContainer}>
      {error ? (
        <div className={classes.error}>
          <h2 className={classes.error__title}>Произошла ошибка ({error}).</h2>
          <div className={classes.error__description}>
            К сожалению, не загрузить товар. Попробуйте повторить попытку позже
          </div>
        </div>
      ) : isLoading ? (
        <ProductIdSkeleton />
      ) : (
        <div className={classes.productId}>
          <div className={classes.productId__col1}>
            <div className={classes.productId__img}>
              <img src={require(`../../assets/img/${product.image}HQ.png`)} alt={product.title} />
            </div>
            <ConfigurationSelector
              memory={product.memory}
              setActiveMemory={setActiveMemory}
              activeMemory={activeMemory}
              colours={product.colours}
              setActiveColour={setActiveColour}
              activeColour={activeColour}
            />
          </div>
          <div className={classes.productId__col2}>
            <div className={classes.productId__title}>{product.title}</div>
            <ul className={classes.productId__characteristicsList}>
              {product.descriptionCharacteristics.map((characteristic, index) => (
                <li key={index} className={classes.productId__characteristicItem}>
                  {characteristic}
                </li>
              ))}
            </ul>
            <div className={classes.productId__button}>
              <div className={classes.productId__price}>От {product.price} ₽</div>
              <AddProductButton
                size={'medium'}
                onClick={() => dispatch(addProduct(productForCart))}>
                {productCount}
              </AddProductButton>
            </div>
          </div>
        </div>
      )}
      <div className={classes.backButton}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
      </div>
    </div>
  );
};

export default ProductId;
