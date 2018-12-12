--用户表
CREATE TABLE public."user"
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    "phone" varchar(11) NOT NULL,
    "nickName" varchar(64) NOT NULL,
    "shopCartId" text DEFAULT uuid_generate_v1mc() NOT NULL,
    "orderId" varchar(64) NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX user_id_uindex ON public."user" (id);
COMMENT ON COLUMN public."user".id IS '用户id';
COMMENT ON COLUMN public."user"."phone" IS '用户手机号';
COMMENT ON COLUMN public."user"."nickName" IS '用户昵称';
COMMENT ON COLUMN public."user"."shopCartId" IS '购物车id';
COMMENT ON COLUMN public."user"."orderId" IS '订单id';
COMMENT ON COLUMN public."user"."createTime" IS '创建时间';
COMMENT ON COLUMN public."user"."updateTime" IS '更新时间';
COMMENT ON TABLE public."user" IS '用户表';

--商品表
CREATE TABLE public.goods
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    title text NOT NULL,
    "marketPrice" varchar(32) NOT NULL,
    "shopPrice" varchar(32) NOT NULL,
    "promotionPrice" varchar(32),
    "promotionTime" timestamptz NOT NULL,
    "imgUrl" text NOT NULL,
    "saleStatus" sale_status DEFAULT 'soldout' NOT NULL,
    "pressId" text NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX goods_id_uindex ON public.goods (id);
COMMENT ON COLUMN public.goods.id IS '商品id';
COMMENT ON COLUMN public.goods.title IS '商品标题';
COMMENT ON COLUMN public.goods."marketPrice" IS '市场价';
COMMENT ON COLUMN public.goods."shopPrice" IS '商城价';
COMMENT ON COLUMN public.goods."promotionPrice" IS '促销价';
COMMENT ON COLUMN public.goods."promotionTime" IS '促销时间';
COMMENT ON COLUMN public.goods."imgUrl" IS '图片Url';
COMMENT ON COLUMN public.goods."saleStatus" IS '上架状态， 默认下架';
COMMENT ON COLUMN public.goods."pressId" IS '出版社id';
COMMENT ON COLUMN public.goods."createTime" IS '创建时间';
COMMENT ON COLUMN public.goods."updateTime" IS '更新时间';
COMMENT ON TABLE public.goods IS '商品信息表';


--库存表
CREATE TABLE public.inventory
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    "goodsName" text NOT NULL,
    inventory int NOT NULL,
    "publishTime" timestamptz DEFAULT now() NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX inventory_id_uindex ON public.inventory (id);
COMMENT ON COLUMN public.inventory.id IS '库存id';
COMMENT ON COLUMN public.inventory."goodsName" IS '商品名称';
COMMENT ON COLUMN public.inventory.inventory IS '商品库存量';
COMMENT ON COLUMN public.inventory."publishTime" IS '出版时间';
COMMENT ON COLUMN public.inventory."createTime" IS '创建时间';
COMMENT ON COLUMN public.inventory."updateTime" IS '更新时间';
COMMENT ON TABLE public.inventory IS '库存表';

--出版社表
CREATE TABLE public.press
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    location text NOT NULL,
    "officialUrl" text NOT NULL,
    telephone varchar(32) NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX press_id_uindex ON public.press (id);
COMMENT ON COLUMN public.press.id IS '出版社id';
COMMENT ON COLUMN public.press.location IS '出版社地点';
COMMENT ON COLUMN public.press."officialUrl" IS '官方url';
COMMENT ON COLUMN public.press.telephone IS '联系电话';
COMMENT ON COLUMN public.press."createTime" IS '创建时间';
COMMENT ON COLUMN public.press."updateTime" IS '更新时间';
COMMENT ON TABLE public.press IS '出版社';

--购物车表
CREATE TABLE public.shopping_cart
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    "goodsName" varchar(64) NOT NULL,
    "marketPrice" varchar(32) NOT NULL,
    "shopPrice" varchar(32) NOT NULL,
    "promotionPrice" varchar(32) NOT NULL,
    "userId" text DEFAULT uuid_generate_v1mc() NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX shopping_cart_id_uindex ON public.shopping_cart (id);
COMMENT ON COLUMN public.shopping_cart.id IS '购物车id';
COMMENT ON COLUMN public.shopping_cart."goodsName" IS '商品名称表';
COMMENT ON COLUMN public.shopping_cart."marketPrice" IS '市场价';
COMMENT ON COLUMN public.shopping_cart."shopPrice" IS '商城价';
COMMENT ON COLUMN public.shopping_cart."promotionPrice" IS '折扣价';
COMMENT ON COLUMN public.shopping_cart."userId" IS '用户Id';
COMMENT ON COLUMN public.shopping_cart."createTime" IS '创建时间';
COMMENT ON COLUMN public.shopping_cart."updateTime" IS '更新时间';
COMMENT ON TABLE public.shopping_cart IS '购物车表';

--订单表
CREATE TABLE public."order"
(
    id text DEFAULT uuid_generate_v1mc() PRIMARY KEY NOT NULL,
    "goodsName" varchar(64) NOT NULL,
    "goodsCount" int NOT NULL,
    "buyPrice" varchar(32) NOT NULL,
    "totalPrices" varchar(32) NOT NULL,
    "userId" text DEFAULT uuid_generate_v1mc() NOT NULL,
    "createTime" timestamptz DEFAULT now() NOT NULL,
    "updateTime" timestamptz NOT NULL
);
CREATE UNIQUE INDEX order_id_uindex ON public."order" (id);
COMMENT ON COLUMN public."order".id IS '订单id';
COMMENT ON COLUMN public."order"."goodsName" IS '商品名称';
COMMENT ON COLUMN public."order"."goodsCount" IS '商品数量';
COMMENT ON COLUMN public."order"."buyPrice" IS '购买价格';
COMMENT ON COLUMN public."order"."totalPrices" IS '商品总价';
COMMENT ON COLUMN public."order"."userId" IS '用户id关联';
COMMENT ON COLUMN public."order"."createTime" IS '创建时间';
COMMENT ON COLUMN public."order"."updateTime" IS '更新时间';
COMMENT ON TABLE public."order" IS '订单表';