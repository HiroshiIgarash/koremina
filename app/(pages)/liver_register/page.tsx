import getLivers from "@/app/action/getLivers";
import { notFound } from "next/navigation";
import liverData from "@/public/liver.json";
import GroupRegisterButton from "./GroupRegisterButton";
import { cn } from "@/lib/utils";
import ChannelIcon from "@/components/feature/setting/ChannelIcon";
import RegisterButton from "./RegisterButton";
import updateLiver from "./updateLiver";
import { ComponentPropsWithoutRef } from "react";
import { Liver } from "@prisma/client";
import { z } from "zod";
import { normalizeLiverName } from "@/lib/normalizeLiverName";

const Page = async () => {
  const livers = await getLivers();

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  // liver.json のどのエントリとも名前が一致しないDB行。過去に不可視文字の
  // 表記揺れで照合が外れ、重複レコードが放置されたため明示的に警告する
  const orphanLivers = livers.filter(
    dbLiver =>
      !liverData.some(
        l => normalizeLiverName(l.name) === normalizeLiverName(dbLiver.name)
      )
  );

  return (
    <div className="px-4 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-16">ライバー登録</h1>
      <p className="mb-16">
        liverData.jsonの情報に基づき表示しています。
        <br />
        DBと情報が異なる場合は背景が赤くなります。
        <br />
        ライバーを更新、登録するときはliverData.jsonで編集したのち、このページでDBのデータを更新すること。
      </p>
      {orphanLivers.length > 0 && (
        <div className="mb-16 border-2 border-red-600 p-4">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            liverData.jsonに存在しないDBレコード
          </h2>
          <p className="mb-2 text-sm">
            名前の表記揺れや重複登録の可能性があります。内容を確認して対処してください。
          </p>
          <ul className="text-sm space-y-1">
            {orphanLivers.map(liver => (
              <li key={liver.id}>
                {liver.name}（id: {liver.id} / channelHandle:{" "}
                {liver.channelHandle || "未設定"}）
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-xl font-bold mt-4 mb-2">在籍にじさんじライバー</h2>
      <GroupRegisterButton listId="nijisanji" />
      <ul id="nijisanji" className="space-y-2">
        {liverData
          .filter(liver => !liver.isOverseas && !liver.isRetire)
          .map(liver => (
            <LiverFormItem key={liver.name} liver={liver} dbLivers={livers} />
          ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍海外ライバー</h2>
      <GroupRegisterButton listId="nijisanji_en" />
      <ul id="nijisanji_en" className="space-y-2">
        {liverData
          .filter(liver => liver.isOverseas && !liver.isRetire)
          .map(liver => (
            <LiverFormItem key={liver.name} liver={liver} dbLivers={livers} />
          ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業にじさんじライバー</h2>
      <GroupRegisterButton listId="nijisanji_retire" />
      <ul id="nijisanji_retire" className="space-y-2">
        {liverData
          .filter(liver => !liver.isOverseas && liver.isRetire)
          .map(liver => (
            <LiverFormItem key={liver.name} liver={liver} dbLivers={livers} />
          ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業海外ライバー</h2>
      <GroupRegisterButton listId="nijisanji_retire_overseas" />
      <ul id="nijisanji_retire_overseas" className="space-y-2">
        {liverData
          .filter(liver => liver.isOverseas && liver.isRetire)
          .map(liver => (
            <LiverFormItem key={liver.name} liver={liver} dbLivers={livers} />
          ))}
      </ul>
      <div className="mt-4 text-center">
        <GroupRegisterButton />
      </div>
    </div>
  );
};

const LiverFormItem = ({
  liver,
  dbLivers: livers,
}: {
  liver: (typeof liverData)[0];
  dbLivers: Awaited<ReturnType<typeof getLivers>>;
}) => {
  // 不可視文字（NBSP等）の表記揺れで照合が外れないよう正規化して比較する
  const liver_db = livers.find(
    l => normalizeLiverName(l.name) === normalizeLiverName(liver.name)
  );
  const isLiverDuplicate =
    livers.filter(
      l => normalizeLiverName(l.name) === normalizeLiverName(liver.name)
    ).length > 1;
  return (
    <li
      key={liver.name}
      className={cn(
        "liverItem  border p-2",
        isLiverDuplicate && "border-red-600 border-2"
      )}
    >
      <form
        action={updateLiver}
        className="grid grid-cols-[repeat(12,auto)] gap-2 items-center text-sm"
      >
        <ChannelIcon channelId={liver.channelHandle} />
        <LiverFormInput
          name="index"
          className="w-12"
          defaultValue={liverData.findIndex(l => l.name === liver.name)}
        />
        <LiverFormInput name="id" defaultValue={liver_db?.id} readOnly />
        <LiverFormInput name="name" liverDB={liver_db} liverJSON={liver} />
        <LiverFormInput
          name="aliasFirst"
          liverJSON={liver}
          liverDB={liver_db}
        />
        <LiverFormInput
          name="aliasSecond"
          liverJSON={liver}
          liverDB={liver_db}
        />
        <LiverFormInput
          name="channelHandle"
          liverJSON={liver}
          liverDB={liver_db}
        />
        <div>
          卒業：
          <LiverFormInput
            name="isRetire"
            liverJSON={liver}
            liverDB={liver_db}
            className="max-w-9"
          />
        </div>
        <div>
          海外：
          <LiverFormInput
            name="isOverseas"
            liverJSON={liver}
            liverDB={liver_db}
            className="max-w-9"
          />
        </div>
        <div>
          <LiverFormInput
            name="birthMonth"
            liverJSON={liver}
            liverDB={liver_db}
            className="max-w-9"
          />
          月
        </div>
        <div>
          <LiverFormInput
            name="birthDate"
            liverJSON={liver}
            liverDB={liver_db}
            className="max-w-9"
          />
          日
        </div>
        <RegisterButton liverId={liver_db?.id} className="w-16" />
      </form>
    </li>
  );
};

const dbLiverSchemaMapping = {
  id: z.string(),
  index: z.coerce.number(),
  name: z.string(),
  aliasFirst: z.string().transform(input => input || null),
  aliasSecond: z.string().transform(input => input || null),
  channelHandle: z.string(),
  isRetire: z
    .union([z.literal(0), z.literal(1)])
    .transform(input => input === 1),
  isOverseas: z
    .union([z.literal(0), z.literal(1)])
    .transform(input => input === 1),
  birthMonth: z.union([z.null(), z.number()]),
  birthDate: z.union([z.null(), z.number()]),
};

type LiverFormInputProps = ComponentPropsWithoutRef<"input"> & {
  name: keyof Liver;
  liverDB?: Liver;
  liverJSON?: (typeof liverData)[number];
  className?: string;
};
const LiverFormInput = ({
  name,
  liverDB,
  liverJSON,
  className,
  ...props
}: LiverFormInputProps) => {
  const shouldCheckDBAndJSON = name !== "id" && name !== "index";
  /** liverJSONの値 */
  const liverJSONValue =
    liverJSON &&
    (name in liverJSON || undefined) &&
    liverJSON[name as keyof typeof liverJSON];
  /** DBの値に変換 */
  const parsedJSONValue =
    shouldCheckDBAndJSON && dbLiverSchemaMapping[name].parse(liverJSONValue);
  /** DBとJSONの情報があっているか */
  const isEqualDBAndJSON =
    shouldCheckDBAndJSON && (liverDB && liverDB[name]) === parsedJSONValue;

  const defaultValue = (() => {
    if (liverJSONValue === null || liverJSONValue === undefined)
      return undefined;
    return String(liverJSONValue);
  })();

  return (
    <input
      type="text"
      name={name}
      className={cn(
        "border p-2 max-w-24",
        { "bg-red-100": liverJSON && !isEqualDBAndJSON },
        className
      )}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export default Page;
