//==============================================================================
// dsPassiveSkill.js
// Copyright (c) 2015 - 2019 DOURAKU
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @plugindesc パッシブスキルを実装するプラグイン ver1.12.0
 * @author 道楽
 *
 * @param Show Battle
 * @desc パッシブスキルを戦闘中に表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 * @type boolean
 *
 * @param Show Battle Switch ID
 * @desc 戦闘中のパッシブスキル表示を制御するスイッチのＩＤ
 * (0なら「Show Battle」の設定に従う)
 * @default 0
 * @type number
 *
 * @help
 * このプラグインは以下のメモタグの設定ができます。
 *
 * -----------------------------------------------------------------------------
 * スキルに設定するメモタグ
 *
 * --------
 * ・装備できる武器の種類を追加(Equip Weapon)
 * <passiveEWPN[武器タイプ]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *
 * --------
 * ・装備できる防具の種類を追加(Equip Armor)
 * <passiveEARM[防具タイプ]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *
 * --------
 * ・特定の通常能力値をアップ(Parameter Boost)
 * <passivePBST[能力値番号]:[上昇量(%)]>
 *  [能力値番号] - 上昇させる通常能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - ＨＰ
 *                 1 - ＭＰ
 *                 2 - 攻撃力
 *                 3 - 防御力
 *                 4 - 魔法力
 *                 5 - 魔法防御
 *                 6 - 敏捷性
 *                 7 - 運
 *  [上昇量(%)]  - 能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *                 装備なし状態の能力値に対しての倍率がかかる。
 *
 * --------
 * ・一定の条件下において、特定の通常能力値をアップ(Parameter Boost Ex)
 * <passivePBSTEX[能力値番号]:[上昇量(%)],[参照する条件],[判定する値]>
 *  [能力値番号]   - passivePBST参照
 *  [上昇量(%)]    - passivePBST参照
 *  [参照する条件] - 効果を発揮する条件を以下の中から設定する。(文字列)
 *                   HPUP - ＨＰが特定の値以上の場合に効果を発揮
 *                   HPLW - ＨＰが特定の値以下の場合に効果を発揮
 *                   MPUP - ＭＰが特定の値以上の場合に効果を発揮
 *                   MPLW - ＭＰが特定の値以下の場合に効果を発揮
 *                   TPUP - ＴＰが特定の値以上の場合に効果を発揮
 *                   TPLW - ＴＰが特定の値以下の場合に効果を発揮
 *                   STAT - 特定のステートを受けている場合に効果を発揮
 *  [判定する値]   - 条件の判定に使用するパーセンテージ。(数字)
 *                   STATの場合はステート番号。(数字)
 *
 * 例) HP50%以下で攻撃力が50%アップするスキルを作成する場合
 * <passivePBSTEX2:50%,HPUP,50>
 *
 * --------
 * ・特定の追加能力値をアップ(XParameter Boost)
 * <passiveXPBST[能力値番号]:[上昇量]>
 *  [能力値番号] - 上昇させる追加能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 命中率
 *                 1 - 回避率
 *                 2 - 会心率
 *                 3 - 会心回避率
 *                 4 - 魔法回避率
 *                 5 - 魔法反射率
 *                 6 - 反撃率
 *                 7 - ＨＰ再生率
 *                 8 - ＭＰ再生率
 *                 9 - ＴＰ再生率
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * --------
 * ・一定の条件下において、特定の追加能力値をアップ(XParameter Boost Ex)
 * <passiveXPBSTEX[能力値番号]:[上昇量],[参照する条件],[判定する値]>
 *  [能力値番号]   - passiveXPBST参照
 *  [上昇量]       - passiveXPBST参照
 *  [参照する条件] - passivePBSTEX参照
 *  [判定する値]   - passivePBSTEX参照
 *
 * 例) MP最大時にHPが5%再生するスキルを作成する場合
 * <passiveXPBSTEX7:5,MPUP,100>
 *
 * --------
 * ・特定の特殊能力値をアップ(SParameter Boost)
 * <passiveSPBST[能力値番号]:[上昇量]>
 *  [能力値番号] - 上昇させる特殊能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 狙われ率
 *                 1 - 防御効果率
 *                 2 - 回復効果率
 *                 3 - 薬の知識率
 *                 4 - ＭＰ消費率
 *                 5 - ＴＰチャージ率
 *                 6 - 物理ダメージ率
 *                 7 - 魔法ダメージ率
 *                 8 - 床ダメージ率
 *                 9 - 経験値獲得率
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * --------
 * ・一定の条件下において、特定の追加能力値をアップ(XParameter Boost Ex)
 * <passiveSPBSTEX[能力値番号]:[上昇量],[参照する条件],[判定する値]>
 *  [能力値番号]   - passiveSPBST参照
 *  [上昇量]       - passiveSPBST参照
 *  [参照する条件] - passivePBSTEX参照
 *  [判定する値]   - passivePBSTEX参照
 *
 * 例) TPが50%以上の時に狙われやすくするスキルを作成する場合
 * <passiveSPBSTEX0:50,TPUP,50>
 *
 * --------
 * ※更新に伴い非推奨 (passivePBSTEXを使用してください)
 * ・一定のＨＰ以下の場合のみ特定の通常能力値をアップ(Indomitable)
 * <passiveINDM[能力値番号]:[HP残量率],[上昇量(%)]>
 *  [能力値番号] - passivePBST参照
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量(%)]  - 能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *                 装備なし状態の能力値に対しての倍率がかかる。
 *
 * --------
 * ※更新に伴い非推奨 (passiveXPBSTEXを使用してください)
 * ・一定のＨＰ以下の場合のみ特定の追加能力値をアップ(XIndomitable)
 * <passiveXINDM[能力値番号]:[HP残量率],[上昇量]>
 *  [能力値番号] - passiveXPBST参照
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * --------
 * ※更新に伴い非推奨 (passiveSPBSTEXを使用してください)
 * ・一定のＨＰ以下の場合のみ特定の特殊能力値をアップ(SIndomitable)
 * <passiveSINDM[能力値番号]:[HP残量率],[上昇量]>
 *  [能力値番号] - passiveSPBST参照
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * --------
 * ・属性有効度を設定(Element Rate)
 * <passiveELEM[属性番号]:[倍率]>
 *  [属性番号] - 有効度を設定する属性の番号を2桁の数値で設定する。(数字)
 *  [有効度]   - 有効度を表すパーセンテージ。(数字)
 *               職業等で設定されている属性有効度に乗算されます。
 *
 * --------
 * ・属性有効度を設定の加算バージョン(Element Rate Add Ver)
 * <passiveELEM_ADD[属性番号]:[倍率]>
 *  [属性番号] - 有効度を設定する属性の番号を2桁の数値で設定する。(数字)
 *  [有効度]   - 有効度を表すパーセンテージ。(数字)
 *               職業等で設定されている属性有効度に加算されます。
 * 
 * --------
 * ・ステート有効度を設定(State Rate)
 * <passiveSTAT[ステート番号]:[有効度]>
 *  [ステート番号] - 耐性を上昇させるステートの番号を4桁の数値で設定する。(数字)
 *  [有効度]       - 有効度を表すパーセンテージ。(数字)
 *                   職業等で設定されているステート有効度に乗算されます。
 *
 * --------
 * ・ステート有効度を設定の加算バージョン(State Rate Add Ver)
 * <passiveSTAT_ADD[ステート番号]:[有効度]>
 *  [ステート番号] - 耐性を上昇させるステートの番号を4桁の数値で設定する。(数字)
 *  [有効度]       - 有効度を表すパーセンテージ。(数字)
 *                   職業等で設定されているステート有効度に加算されます。
 *
 * --------
 * ・無効化できるステートを追加(State Regist)
 * <passiveSTREG[ステート番号]>
 *  [ステート番号] - 無効化できるステートの番号を4桁の数値で設定する。(数字)
 *
 * --------
 * ・攻撃時ステートを設定(Attack State)
 * <passiveATKST[ステート番号]:[付与率]>
 *  [ステート番号] - 攻撃時に付与するステートの番号を4桁の数値で設定する。(数字)
 *  [付与率]       - 付与率を表すパーセンテージ。(数字)
 *                   職業等で設定されているステート付与率に加算されます。
 *
 * --------
 * ・スキルタイプ追加(Add Skill Type)
 * <passiveAST[スキルタイプ番号]>
 *  [スキルタイプ番号] - スキルタイプの番号を2桁の数値で設定する。(数字)
 *
 * --------
 * ・武器装備時の通常能力値の上昇量をアップ(Weapon Mastery)
 * <passiveWPNM[武器タイプ]:[上昇量(%)]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *
 * --------
 * ・武器装備時の追加能力値の上昇量をアップ(Weapon MasteryX)
 * <passiveWPNMX[武器タイプ]:[上昇量(%)]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *
 * --------
 * ・武器装備時の特殊能力値の上昇量をアップ(Weapon MasteryS)
 * <passiveWPNMS[武器タイプ]:[上昇量(%)]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *                 (倍率は100%を基準として計算されます)
 *
 * --------
 * ・武器装備時に特定の通常能力値をアップ(Weapon Parameter Boost)
 * <passiveWPBST[武器タイプ]_[能力値番号]:[上昇量]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる通常能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - ＨＰ
 *                 1 - ＭＰ
 *                 2 - 攻撃力
 *                 3 - 防御力
 *                 4 - 魔法力
 *                 5 - 魔法防御
 *                 6 - 敏捷性
 *                 7 - 運
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・武器装備時に特定の追加能力値をアップ(Weapon XParameter Boost)
 * <passiveWXPBST[武器タイプ]_[能力値番号]:[上昇量]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる追加能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 命中率
 *                 1 - 回避率
 *                 2 - 会心率
 *                 3 - 会心回避率
 *                 4 - 魔法回避率
 *                 5 - 魔法反射率
 *                 6 - 反撃率
 *                 7 - ＨＰ再生率
 *                 8 - ＭＰ再生率
 *                 9 - ＴＰ再生率
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・武器装備時に特定の特殊能力値をアップ(Weapon SParameter Boost)
 * <passiveWSPBST[武器タイプ]_[能力値番号]:[上昇量]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる特殊能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 狙われ率
 *                 1 - 防御効果率
 *                 2 - 回復効果率
 *                 3 - 薬の知識率
 *                 4 - ＭＰ消費率
 *                 5 - ＴＰチャージ率
 *                 6 - 物理ダメージ率
 *                 7 - 魔法ダメージ率
 *                 8 - 床ダメージ率
 *                 9 - 経験値獲得率
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・防具装備時の通常能力値をアップ(Armor Mastery)
 * <passiveARMM[防具タイプ]:[上昇量(%)]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *
 * --------
 * ・防具装備時の追加能力値の上昇量をアップ(Armor MasteryX)
 * <passiveARMMX[防具タイプ]:[上昇量(%)]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *
 * --------
 * ・防具装備時の特殊能力値の上昇量をアップ(Armor MasteryS)
 * <passiveARMMS[防具タイプ]:[上昇量(%)]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %ありなら倍率、なしなら直値となる。(数字)
 *                 (倍率は100%を基準として計算されます)
 * 
 * --------
 * ・防具装備時に特定の通常能力値をアップ(Armor Parameter Boost)
 * <passiveAPBST[防具タイプ]_[能力値番号]:[上昇量]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる通常能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - ＨＰ
 *                 1 - ＭＰ
 *                 2 - 攻撃力
 *                 3 - 防御力
 *                 4 - 魔法力
 *                 5 - 魔法防御
 *                 6 - 敏捷性
 *                 7 - 運
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・防具装備時に特定の追加能力値をアップ(Armor XParameter Boost)
 * <passiveAXPBST[防具タイプ]_[能力値番号]:[上昇量]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる追加能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 命中率
 *                 1 - 回避率
 *                 2 - 会心率
 *                 3 - 会心回避率
 *                 4 - 魔法回避率
 *                 5 - 魔法反射率
 *                 6 - 反撃率
 *                 7 - ＨＰ再生率
 *                 8 - ＭＰ再生率
 *                 9 - ＴＰ再生率
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・防具装備時に特定の特殊能力値をアップ(Armor SParameter Boost)
 * <passiveASPBST[防具タイプ]_[能力値番号]:[上昇量]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [能力値番号] - 上昇させる特殊能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 狙われ率
 *                 1 - 防御効果率
 *                 2 - 回復効果率
 *                 3 - 薬の知識率
 *                 4 - ＭＰ消費率
 *                 5 - ＴＰチャージ率
 *                 6 - 物理ダメージ率
 *                 7 - 魔法ダメージ率
 *                 8 - 床ダメージ率
 *                 9 - 経験値獲得率
 *  [上昇量]     - 装備時の能力値の上昇量。(数字)
 *
 * --------
 * ・攻撃追加回数を追加する(Attack Times Add)
 * <passiveATADD:[追加量]>
 *  [追加量] - 攻撃回数を設定する。(数字)
 *
 * --------
 * ・先制攻撃率をアップ(Preemptive)
 * <passivePREE:[上昇量]>
 *  [上昇量] - 先制攻撃率のアップ率を%で設定する。(数字)
 *
 * --------
 * ・不意打ち率をダウン(Anti Surprise)
 * <passiveASUP:[下降量]>
 *  [下降量] - 不意打ち率のダウン率を%で設定する。(数字)
 * 
 * --------
 * ・二刀流を有効にする(Dual Wield)
 * <passiveDUAL>
 *
 * --------
 * ・行動回数を追加する(Action Plus)
 * <passiveAPLUS:[追加確率]>
 *  [追加確率(%)] - 行動を追加する確率を表すパーセンテージ。(数字)
 *
 * --------
 * ・自動戦闘を有効にする(Auto Battle)
 * <passiveAUTO>
 *
 * --------
 * ・防御を有効にする(Guard)
 * <passiveGUARD>
 *
 * --------
 * ・身代わり状態にする(Substitute)
 * <passiveSUBS>
 *
 * --------
 * ・TP持ち越しを有効にする(Preserve Tp)
 * <passivePRETP>
 *
 */

var Imported = Imported || {};
Imported.dsPassiveSkill = true;

(function (exports) {
	'use strict';

	exports.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters('dsPassiveSkill');
		ret.ShowBattle = Boolean(parameters['Show Battle'] === 'true' || false);
		ret.ShowBattleSwitchId = Number(parameters['Show Battle Switch ID']);
		return ret;
	})();

	//--------------------------------------------------------------------------
	/** Utility */
	function Utility() {}

	Utility.calcParamBoost = function(baseParam, metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)(%?)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			if ( match[2] === '%' )
			{
				var rate = Number(match[1]) * 0.01;
				ret = Math.floor(baseParam * rate);
			}
			else
			{
				ret = Number(match[1]);
			}
		}
		return ret;
	};

	Utility.calcXParamBoost = function(metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			ret = Number(match[1]) * 0.01;
		}
		return ret;
	};

	Utility.calcSParamBoost = function(metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			ret = Number(match[1]) * 0.01;
		}
		return ret;
	};

	Utility.calcMastery = function(baseParam, metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)(%?)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			if ( match[2] === '%' )
			{
				var rate = Number(match[1]) * 0.01;
				ret = Math.floor(baseParam * rate);
			}
			else
			{
				ret = Number(match[1]);
			}
		}
		return ret;
	};

	Utility.calcMasteryX = function(baseParam, metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)(%?)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			if ( match[2] === '%' )
			{
				var rate = Number(match[1]) * 0.01;
				ret = baseParam * rate;
			}
			else
			{
				ret = Number(match[1]);
			}
		}
		return ret;
	};

	Utility.calcMasteryS = function(baseParam, metaData)
	{
		var ret = 0;
		var re = /([-]?\d+)(%?)/i;
		var match = re.exec(metaData);
		if ( match )
		{
			if ( match[2] === '%' )
			{
				var rate = Number(match[1]) * 0.01;
				ret = (baseParam-1.0) * rate;
			}
			else
			{
				ret = Number(match[1]);
			}
		}
		return ret;
	};

	//--------------------------------------------------------------------------
	/** Game_Actor */
	var _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.refreshSkillTypes = function()
	{
		_Game_Actor_initMembers.call(this);
		this._psSkillTypes = [];
	};

	Game_Actor.prototype.refreshSkillTypes = function()
	{
		this._psSkillTypes = [];
		var skillTypesMax = $dataSystem.skillTypes.length;
		for ( var ii = 1; ii < skillTypesMax; ii++ )
		{
			var tag = 'passiveAST' + ('00'+ii).slice(-2);
			var find = false;
			this.iteratePassiveSkill(tag, function(metaData) {
				find = true;
			});
			if ( find )
			{
				this._psSkillTypes.push(ii);
			}
		}
	};

	var _Game_Actor_refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function()
	{
		_Game_Actor_refresh.call(this);
		this.refreshSkillTypes();
	};

	var _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId)
	{
		var lastDualWield = this.isDualWield();
		_Game_Actor_learnSkill.call(this, skillId);
		if ( lastDualWield !== this.isDualWield() )
		{
			this.refresh();
		}
		this.refreshSkillTypes();
	};

	Game_Actor.prototype.iteratePassiveSkill = function(metaName, callback)
	{
		this.skills().forEach(function(skill) {
			if ( skill.meta[metaName] )
			{
				callback(skill.meta[metaName]);
			}
		});
	};

	Game_Actor.prototype.evaluateCondition = function(condition, value)
	{
		var ret = false;
		switch ( condition )
		{
		case 'HPUP': ret = (this.hpRate() >= value * 0.01) ? true : false; break;
		case 'HPLW': ret = (this.hpRate() <= value * 0.01) ? true : false; break;
		case 'MPUP': ret = (this.mpRate() >= value * 0.01) ? true : false; break;
		case 'MPLW': ret = (this.mpRate() <= value * 0.01) ? true : false; break;
		case 'TPUP': ret = (this.tpRate() >= value * 0.01) ? true : false; break;
		case 'TPLW': ret = (this.tpRate() <= value * 0.01) ? true : false; break;
		case 'STAT': ret = this.isStateAffected(value);                    break;
		}
		return ret;
	};

	Game_Actor.prototype.itemTraitsWithId = function(item, code, dataId)
	{
		return item.traits.filter(function(trait) {
			return trait.code === code && trait.dataId === dataId;
		});
	};

	Game_Actor.prototype.itemTraitsSum = function(item, code, id)
	{
		return this.itemTraitsWithId(item, code, id).reduce(function(r, trait) {
			return r + trait.value;
		}, 0);
	};

	var _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
	Game_Actor.prototype.paramBaseDirect = function(paramId)
	{
		return _Game_Actor_paramBase.call(this, paramId);
	};

	Game_Actor.prototype.paramBaseBoost = function(paramId)
	{
		var baseParam = this.paramBaseDirect(paramId);
		var ret = 0;
		var tagPBST = 'passivePBST' + ('0'+paramId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			ret += Utility.calcParamBoost(baseParam, metaData);
		});
		var tagPBSTEX = 'passivePBSTEX' + ('0'+paramId).slice(-1);
		this.iteratePassiveSkill(tagPBSTEX, function(metaData) {
			var splitData = metaData.split(',');
			if ( this.evaluateCondition(splitData[1], Number(splitData[2])) )
			{
				ret += Utility.calcParamBoost(baseParam, splitData[0]);
			}
		}.bind(this));
		var tagINDM = 'passiveINDM' + ('0'+paramId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,([-]?\d+)(%?)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					if ( match[3] === '%' )
					{
						var rate = Number(match[2]) * 0.01;
						ret += Math.floor(baseParam * rate);
					}
					else
					{
						ret += Number(match[2]);
					}
				}
			}
		}.bind(this));
		return ret;
	};

	Game_Actor.prototype.paramBase = function(paramId)
	{
		var ret = this.paramBaseDirect(paramId);
		ret += this.paramBaseBoost(paramId);
		return ret;
	};

	var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlusDirect = function(paramId)
	{
		return _Game_Actor_paramPlus.call(this, paramId);
	};

	Game_Actor.prototype.paramPlusBoost = function(paramId)
	{
		var ret = 0;
		this.equips().forEach(function(item) {
			if ( item )
			{
				if ( DataManager.isWeapon(item) )
				{
					if ( item.params[paramId] > 0 )
					{
						var tagWPNM = 'passiveWPNM' + ('00'+item.wtypeId).slice(-2);
						this.iteratePassiveSkill(tagWPNM, function(metaData) {
							ret += Utility.calcMastery(item.params[paramId], metaData);
						});
					}
					var tagWPBST = 'passiveWPBST' + ('00'+item.wtypeId).slice(-2) + '_' + paramId;
					this.iteratePassiveSkill(tagWPBST, function(metaData) {
						ret += Number(metaData);
					});
				}
				else if ( DataManager.isArmor(item) )
				{
					if ( item.params[paramId] > 0 )
					{
						var tagARMM = 'passiveARMM' + ('00'+item.atypeId).slice(-2);
						this.iteratePassiveSkill(tagARMM, function(metaData) {
							ret += Utility.calcMastery(item.params[paramId], metaData);
						});
					}
					var tagAPBST = 'passiveAPBST' + ('00'+item.atypeId).slice(-2) + '_' + paramId;
					this.iteratePassiveSkill(tagAPBST, function(metaData) {
						ret += Number(metaData);
					});
				}
			}
		}, this);
		return ret;
	};

	Game_Actor.prototype.paramPlus = function(paramId)
	{
		var ret = this.paramPlusDirect(paramId);
		ret += this.paramPlusBoost(paramId);
		return ret;
	};

	var _Game_Actor_xparam = Game_Actor.prototype.xparam;
	Game_Actor.prototype.xparamDirect = function(xparamId)
	{
		return _Game_Actor_xparam.call(this, xparamId);
	};

	Game_Actor.prototype.xparam = function(xparamId)
	{
		var ret = this.xparamDirect(xparamId);
		var tagPBST = 'passiveXPBST' + ('0'+xparamId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			ret += Utility.calcXParamBoost(metaData);
		});
		var tagPBSTEX = 'passiveXPBSTEX' + ('0'+xparamId).slice(-1);
		this.iteratePassiveSkill(tagPBSTEX, function(metaData) {
			var splitData = metaData.split(',');
			if ( this.evaluateCondition(splitData[1], Number(splitData[2])) )
			{
				ret += Utility.calcXParamBoost(splitData[0]);
			}
		}.bind(this));
		var tagINDM = 'passiveXINDM' + ('0'+xparamId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,([-]?\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					ret += Number(match[2]) * 0.01;
				}
			}
		}.bind(this));
		this.equips().forEach(function(item) {
			if ( item )
			{
				var value = this.itemTraitsSum(item, Game_BattlerBase.TRAIT_XPARAM, xparamId);
				if ( DataManager.isWeapon(item) )
				{
					if ( value > 0 )
					{
						var tagWPNMX = 'passiveWPNMX' + ('00'+item.wtypeId).slice(-2);
						this.iteratePassiveSkill(tagWPNMX, function(metaData) {
							ret += Utility.calcMasteryX(value, metaData);
						});
					}
					var tagWPBST = 'passiveWXPBST' + ('00'+item.wtypeId).slice(-2) + '_' + xparamId;
					this.iteratePassiveSkill(tagWPBST, function(metaData) {
						ret += Number(metaData) * 0.01;
					});
				}
				else if ( DataManager.isArmor(item) )
				{
					if ( value > 0 )
					{
						var tagARMMX = 'passiveARMMX' + ('00'+item.atypeId).slice(-2);
						this.iteratePassiveSkill(tagARMMX, function(metaData) {
							ret += Utility.calcMasteryX(value, metaData);
						});
					}
					var tagAPBST = 'passiveAXPBST' + ('00'+item.atypeId).slice(-2) + '_' + xparamId;
					this.iteratePassiveSkill(tagAPBST, function(metaData) {
						ret += Number(metaData) * 0.01;
					});
				}
			}
		}, this);
		return ret;
	};

	var _Game_Actor_sparam = Game_Actor.prototype.sparam;
	Game_Actor.prototype.sparamDirect = function(sparamId)
	{
		return _Game_Actor_sparam.call(this, sparamId);
	};

	Game_Actor.prototype.sparam = function(sparamId)
	{
		var ret = this.sparamDirect(sparamId);
		var tagPBST = 'passiveSPBST' + ('0'+sparamId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			ret += Utility.calcSParamBoost(metaData);
		});
		var tagPBSTEX = 'passiveSPBSTEX' + ('0'+sparamId).slice(-1);
		this.iteratePassiveSkill(tagPBSTEX, function(metaData) {
			var splitData = metaData.split(',');
			if ( this.evaluateCondition(splitData[1], Number(splitData[2])) )
			{
				ret += Utility.calcSParamBoost(splitData[0]);
			}
		}.bind(this));
		var tagINDM = 'passiveSINDM' + ('0'+sparamId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,([-]?\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					ret += Number(match[2]) * 0.01;
				}
			}
		}.bind(this));
		this.equips().forEach(function(item) {
			if ( item )
			{
				var value = this.itemTraitsSum(item, Game_BattlerBase.TRAIT_SPARAM, sparamId);
				if ( DataManager.isWeapon(item) )
				{
					if ( value > 0 )
					{
						var tagWPNMS = 'passiveWPNMS' + ('00'+item.wtypeId).slice(-2);
						this.iteratePassiveSkill(tagWPNMS, function(metaData) {
							ret += Utility.calcMasteryS(value, metaData);
						});
					}
					var tagWPBST = 'passiveWSPBST' + ('00'+item.wtypeId).slice(-2) + '_' + sparamId;
					this.iteratePassiveSkill(tagWPBST, function(metaData) {
						ret += Number(metaData) * 0.01;
					});
				}
				else if ( DataManager.isArmor(item) )
				{
					if ( value > 0 )
					{
						var tagARMMS = 'passiveARMMS' + ('00'+item.atypeId).slice(-2);
						this.iteratePassiveSkill(tagARMMS, function(metaData) {
							ret += Utility.calcMasteryS(value, metaData);
						});
					}
					var tagAPBST = 'passiveASPBST' + ('00'+item.atypeId).slice(-2) + '_' + sparamId;
					this.iteratePassiveSkill(tagAPBST, function(metaData) {
						ret += Number(metaData) * 0.01;
					});
				}
			}
		}, this);
		return ret;
	};

	var _Game_Actor_elementRate = Game_Actor.prototype.elementRate;
	Game_Actor.prototype.elementRate = function(elementId)
	{
		var ret = _Game_Actor_elementRate.call(this, elementId);
		var tag = 'passiveELEM' + ('00'+elementId).slice(-2);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret *= Number(metaData) * 0.01;
		});
		ret += this.addElementRate(elementId);
		return Math.max(ret, 0);
	};

	Game_Actor.prototype.addElementRate = function(elementId)
	{
		var ret = 0;
		var tag = 'passiveELEM_ADD' + ('00'+elementId).slice(-2);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret += Number(metaData) * 0.01;
		});
		return ret;
	};

	var _Game_Actor_stateRate = Game_Actor.prototype.stateRate;
	Game_Actor.prototype.stateRate = function(stateId)
	{
		var ret = _Game_Actor_stateRate.call(this, stateId);
		var tag = 'passiveSTAT' + ('0000'+stateId).slice(-4);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret *= Number(metaData) * 0.01;
		});
		ret += this.addStateRate(stateId);
		return Math.max(ret, 0);
	};

	Game_Actor.prototype.addStateRate = function(stateId)
	{
		var ret = 0;
		var tag = 'passiveSTAT_ADD' + ('0000'+stateId).slice(-4);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret += Number(metaData) * 0.01;
		});
		return ret;
	};

	var _Game_Actor_stateResistSet = Game_Actor.prototype.stateResistSet;
	Game_Actor.prototype.stateResistSet = function()
	{
		var ret = _Game_Actor_stateResistSet.call(this);
		var num = $dataStates.length;
		for ( var ii = 1; ii < num; ii++ )
		{
			var tag = 'passiveSTREG' + ('0000'+ii).slice(-4);
			this.iteratePassiveSkill(tag, function(metaData) {
				if ( !ret.contains(ii) )
				{
					ret.push(ii);
				}
			});
		}
		return ret;
	};

	var _Game_Actor_attackStates = Game_Actor.prototype.attackStates;
	Game_Actor.prototype.attackStates = function()
	{
		var ret = _Game_Actor_attackStates.call(this);
		var num = $dataStates.length;
		for ( var ii = 1; ii < num; ii++ )
		{
			var tag = 'passiveATKST' + ('0000'+ii).slice(-4);
			this.iteratePassiveSkill(tag, function(metaData) {
				if ( !ret.contains(ii) )
				{
					ret.push(ii);
				}
			});
		}
		return ret;
	};

	var _Game_Actor_attackStatesRate = Game_Actor.prototype.attackStatesRate;
	Game_Actor.prototype.attackStatesRate = function(stateId)
	{
		var ret = _Game_Actor_attackStatesRate.call(this, stateId);
		var tag = 'passiveATKST' + ('0000'+stateId).slice(-4);
		this.iteratePassiveSkill(tag, function(metaData) {
			var re = /([-]?\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret += Number(match[1]) * 0.01;
			}
		});
		return ret;
	};

	var _Game_Actor_attackTimesAdd = Game_Actor.prototype.attackTimesAdd;
	Game_Actor.prototype.attackTimesAdd = function()
	{
		var ret = _Game_Actor_attackTimesAdd.call(this);
		var tag = 'passiveATADD';
		this.iteratePassiveSkill(tag, function(metaData) {
			ret += Number(metaData);
		});
		return ret;
	};

	var _Game_Actor_addedSkillTypes = Game_Actor.prototype.addedSkillTypes;
	Game_Actor.prototype.addedSkillTypes = function()
	{
		var ret = _Game_Actor_addedSkillTypes.call(this);
		if ( this._psSkillTypes )
		{
			this._psSkillTypes.forEach(function(stype) {
				if ( ret.indexOf(stype) < 0 )
				{
					ret.push(stype);
				}
			});
		}
		return ret;
	};

	var _Game_Actor_isEquipWtypeOk = Game_Actor.prototype.isEquipWtypeOk;
	Game_Actor.prototype.isEquipWtypeOk = function(wtypeId)
	{
		var ret = _Game_Actor_isEquipWtypeOk.call(this, wtypeId);
		var tag = 'passiveEWPN' + ('00'+wtypeId).slice(-2);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret = true;
		});
		return ret;
	};

	var _Game_Actor_isEquipAtypeOk = Game_Actor.prototype.isEquipAtypeOk;
	Game_Actor.prototype.isEquipAtypeOk = function(atypeId)
	{
		var ret = _Game_Actor_isEquipAtypeOk.call(this, atypeId);
		var tag = 'passiveEARM' + ('00'+atypeId).slice(-2);
		this.iteratePassiveSkill(tag , function(metaData) {
			ret = true;
		});
		return ret;
	};

	var _Game_Actor_isDualWield = Game_Actor.prototype.isDualWield;
	Game_BattlerBase.prototype.isDualWield = function()
	{
		var ret = _Game_Actor_isDualWield.call(this);
		var tag = 'passiveDUAL';
		this.iteratePassiveSkill(tag, function(metaData) {
			ret = true;
		});
		return ret;
	};

	var _Game_Actor_actionPlusSet = Game_Actor.prototype.actionPlusSet;
	Game_Actor.prototype.actionPlusSet = function()
	{
		var ret = _Game_Actor_actionPlusSet.call(this);
		var tag = 'passiveAPLUS';
		this.iteratePassiveSkill(tag, function(metaData) {
			var re = /(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret.push(Number(match[1]) * 0.01);
			}
		});
		return ret;
	};

	var _Game_Actor_isAutoBattle = Game_Actor.prototype.isAutoBattle;
	Game_Actor.prototype.isAutoBattle = function()
	{
		var ret = _Game_Actor_isAutoBattle.call(this);
		var tag = 'passiveAUTO';
		this.iteratePassiveSkill(tag, function(metaData) {
			ret = true;
		});
		return ret;
	};

	var _Game_Actor_isGuard = Game_Actor.prototype.isGuard;
	Game_Actor.prototype.isGuard = function()
	{
		var ret = _Game_Actor_isGuard.call(this);
		if ( this.canMove() )
		{
			var tag = 'passiveGUARD';
			this.iteratePassiveSkill(tag, function(metaData) {
				ret = true;
			});
		}
		return ret;
	};

	var _Game_Actor_isSubstitute = Game_Actor.prototype.isSubstitute;
	Game_Actor.prototype.isSubstitute = function()
	{
		var ret = _Game_Actor_isSubstitute.call(this);
		if ( this.canMove() )
		{
			var tag = 'passiveSUBS';
			this.iteratePassiveSkill(tag, function(metaData) {
				ret = true;
			});
		}
		return ret;
	};

	var _Game_Actor_isPreserveTp = Game_Actor.prototype.isPreserveTp;
	Game_Actor.prototype.isPreserveTp = function(flagId)
	{
		var ret = _Game_Actor_isPreserveTp.call(this);
		var tag = 'passivePRETP';
		this.iteratePassiveSkill(tag, function(metaData) {
			ret = true;
		});
		return ret;
	};

	//--------------------------------------------------------------------------
	/** Game_Party */
	var _Game_Party_ratePreemptive = Game_Party.prototype.ratePreemptive;
	Game_Party.prototype.ratePreemptive = function(troopAgi)
	{
		var rate = _Game_Party_ratePreemptive.call(this, troopAgi);
		this.battleMembers().some(function(actor) {
			actor.iteratePassiveSkill('passivePREE', function(metaData) {
				rate += Number(metaData) * 0.01;
			});
		});
		return rate.clamp(0.0, 1.0);
	};

	var _Game_Party_rateSurprise = Game_Party.prototype.rateSurprise;
	Game_Party.prototype.rateSurprise = function(troopAgi)
	{
		var rate = _Game_Party_rateSurprise.call(this, troopAgi);
		this.battleMembers().some(function(actor) {
			actor.iteratePassiveSkill('passiveASUP', function(metaData) {
				rate -= Number(metaData) * 0.01 * rate;
			});
		});
		return rate.clamp(0.0, 1.0);
	};

	//--------------------------------------------------------------------------
	/** Window_BattleSkill */
	var _Window_BattleSkill_includes = Window_BattleSkill.prototype.includes;
	Window_BattleSkill.prototype.includes = function(item)
	{
		if ( !this.showPassiveSkill() )
		{
			if ( item )
			{
				var re = /<passive/;
				if ( re.test(item.note) )
				{
					return false;
				}
			}
		}
		return _Window_BattleSkill_includes.call(this, item);
	};

	Window_BattleSkill.prototype.showPassiveSkill = function()
	{
		if ( exports.Param.ShowBattleSwitchId > 0 )
		{
			return $gameSwitches.value(exports.Param.ShowBattleSwitchId);
		}
		else
		{
			return exports.Param.ShowBattle;
		}
	};

}((this.dsPassiveSkill = this.dsPassiveSkill || {})));
