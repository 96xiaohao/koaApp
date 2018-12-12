CREATE TABLE public.video
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
CREATE UNIQUE INDEX video_id_uindex ON public.video (id);
COMMENT ON COLUMN public.video.id IS '商品id';
COMMENT ON COLUMN public.video.title IS '商品标题';
COMMENT ON COLUMN public.video."marketPrice" IS '市场价';
COMMENT ON COLUMN public.video."shopPrice" IS '商城价';
COMMENT ON COLUMN public.video."promotionPrice" IS '促销价';
COMMENT ON COLUMN public.video."promotionTime" IS '促销时间';
COMMENT ON COLUMN public.video."imgUrl" IS '图片Url';
COMMENT ON COLUMN public.video."saleStatus" IS '上架状态， 默认下架';
COMMENT ON COLUMN public.video."pressId" IS '出版社id';
COMMENT ON COLUMN public.video."createTime" IS '创建时间';
COMMENT ON COLUMN public.video."updateTime" IS '更新时间';
COMMENT ON TABLE public.video IS '商品信息表';
