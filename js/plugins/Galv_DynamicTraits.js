/*:ja
 * @plugindesc (v.1.0) アクター/職業/レベル/スクリプトで特徴を追加指定できます。
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Display Trait On Level
 * @text レベルアップ表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc デフォルトのレベルアップメッセージに特徴取得を表示
 * 表示:true / 非表示:false
 * @default true
 *
 * @param Trait Gained Text
 * @text 獲得特徴テキスト
 * @desc レベルアップで特徴を獲得する前に表示されるテキスト
 * @default 獲得特徴:
 *
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://galvs-scripts.com/2017/01/05/mv-dynamic-traits/
 *
 *   Galv's Dynamic Traits
 * ---------------------------------------------------------------------------
 * このプラグインを使用すると、
 * ゲーム中にアクターに新しい特徴を手動で追加したり、
 * アクターと職業を設定して、アクターがレベルアップした時、
 * 新しい特徴を付与したりできます。
 * アクターと職業には、特定のレベルに到達した時、
 * 取得する特徴を制御するメモタグがあり、
 * 必要に応じて、レベルアップメッセージに取得した特徴の通知を追加できます。
 *
 * 特徴レベルアップテキストをより詳細にカスタマイズすることは可能ですが、
 * プラグインファイルを編集して行う必要があり、
 * それがどのように機能するかを理解するにはJavaScriptの理解が必要です。
 * Galvにこれを教えるように頼まないでください。
 *
 * ---------------------------------------------------------------------------
 *   アクター、職業のメモタグ
 * ---------------------------------------------------------------------------
 * レベルで獲得した特徴
 * ----------------------
 * アクターと職業には、
 * 指定された各レベルアップで獲得される特徴のリストを指定するために、
 * 次のメモタグでタグ付けできます。
 * それぞれが|で区切られたlvl、code、id、val特徴を
 * いくつでも入れられます。
 *
 *       <traits:lvl,code,id,val|lvl,code,id,val|lvl,code,id,val>
 *
 * lvlは、コードで取得される特徴のレベルです。
 * idおよびvalの設定は、以下の表で確認できます。
 *
 * 特徴              CODE  ID                 VAL
 * ----------------  ----  -----------        -------------
 * 属性有効度        11    属性ID             %数
 * 弱体有効度        12    通常能力値ID*      %数
 * ステート有効度    13    ステートID         %数
 * ステート無効化    14    ステートID         なし
 *
 * 通常能力値        21    通常能力値ID*      %数
 * 追加能力値        22    追加能力値ID*      %数
 * 特殊能力値        23    特殊能力値ID*      %数
 *
 * 攻撃時属性        31    属性ID             なし
 * 攻撃時ステート    32    属性ID             %数
 * 攻撃速度補正      33    整数               なし
 * 攻撃追加回数      34    0                  整数
 *
 * スキルタイプ追加  41    スキルタイプID     なし
 * スキルタイプ封印  42    スキルタイプID     なし
 * スキル追加        43    スキルID           なし
 * スキル封印        44    スキルID           なし
 *
 * 武器タイプ装備    51    武器タイプID       なし
 * 防具タイプ装備    52    防具タイプID       なし
 * 装備固定          53    装備ID             なし
 * 装備封印          54    装備ID             なし
 * スロットタイプ    55    0:通常 / 1:二刀流  なし
 *
 * 行動回数追加      61    0                  %数
 * 特殊フラグ        62    フラグID*          なし
 * 消滅エフェクト    63    消滅ID*            なし
 * パーティ能力      64    パーティ能力ID*    なし
 * ---------------------------------------------------------------------------
 * 注意点
 *   通常、データベースで確認できる値のIDは1から始まります。
 *   上記の*がある場合、リストの最初のIDは1ではなく0です。
 *
 *   VALがなしの場合、メモタグ/スクリプトのvalに0を入力してください。
 *
 *   アクターに複数のレベルに同じ特徴コードを設定している場合、
 *   最高レベルの特徴を使用します。
 *   職業に複数のレベルに同じ特徴コードを設定している場合、
 *   最高レベルの特徴を使用します。
 *
 *   アクターと職業が同じ特徴コードを設定している場合、
 *   アクターは両方の特徴を実行しますが、
 *   それぞれの特徴の中で最高のもののみを使用します。
 * ---------------------------------------------------------------------------
 *
 * ---------------------------------------------------------------------------
 *  スクリプトコール
 * ---------------------------------------------------------------------------
 * アクターは、スクリプトコールと使って手動で特徴を追加できます。
 * スクリプトコールを使用して、
 * これらの追加された特徴をアクターから再び削除することもできます。
 * ただし、レベル/データベースからアクター/アイテム/ステート等から
 * 追加された特徴を削除することはできません。
 *
 * この手法を使用して特徴を追加すると、
 * 過去に同じコードの手法によって追加された特徴が置き換えられます。
 * したがって、これらの手動で追加された特徴のアクターには、
 * 各特徴の1つのみが残ります。
 *
 *    Galv.DTRAITS.addTrait(actorId,code,id,value);
 *
 *    Galv.DTRAITS.removeTrait(actorId,code);
 *
 * ---------------------------------------------------------------------------
 */