import { memo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { TableStatisticPropsType } from "@/types/statistics.types";

import { statisticsStyles } from "@/styles/statistics.styles";

import { namePlayerStatistic } from "@/utils/statistics";
import { nameParticipant } from "@/utils/points";

import { useIsFullName } from "@/hooks/useIsFullName";

const INITIAL_LIMIT = 5;

const TableStatistic = memo(({ colors, itemStatistic, indexStatistic, t }: TableStatisticPropsType) => {

  const { isFullName } = useIsFullName();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentStat = [t("goals"), t("yellow"), t("red"), t("assists")];
  const title = currentStat[indexStatistic] || '';

  const visibleData = isExpanded ? itemStatistic : itemStatistic.slice(0, INITIAL_LIMIT);
  const canExpand = itemStatistic.length > INITIAL_LIMIT;

  return (
    <View style={[statisticsStyles.cardContainer, { backgroundColor: colors.tertiary, borderColor: colors.outlineVariant }]}>
      <View style={[statisticsStyles.header, { backgroundColor: colors.primary }]}>
        <View style={statisticsStyles.headerTitleContainer}>
          <Text variant="titleMedium" style={statisticsStyles.headerTitle}>
            {title}
          </Text>
        </View>
      </View>

      {itemStatistic.length > 0 ? (
        <View style={statisticsStyles.listContainer}>
          {visibleData.map((item, idx) => {
            const teamName = nameParticipant(item.team);

            return (
              <View
                key={`${item.player}-${idx}`}
                style={[
                  statisticsStyles.row,
                  { backgroundColor: colors.tertiary }
                ]}
              >
                <Text style={[statisticsStyles.rankText, { color: colors.outline }]}>
                  {idx + 1}
                </Text>

                <View style={statisticsStyles.playerInfoContainer}>
                  {
                    item.logo ? (
                      <Avatar.Image
                        source={{ uri: item.logo }}
                        size={28}
                        style={{ margin: 0 }}
                      />
                    ) : (
                      <Avatar.Icon
                        icon="shield-outline"
                        size={28}
                        color='#ffffff'
                        style={{ backgroundColor: item.color, margin: 0 }}
                      />
                    )
                  }
                  <View style={statisticsStyles.namesContainer}>
                    <Text variant="bodyMedium" numberOfLines={1} style={[statisticsStyles.playerName, { color: colors.onSurface }]}>
                      {namePlayerStatistic(item.player)}
                    </Text>
                    <Text variant="bodySmall" numberOfLines={1} style={{ color: colors.outline }}>
                      {teamName}
                    </Text>
                  </View>
                </View>

                <View style={statisticsStyles.valueContainer}>
                  <Text variant="titleSmall" style={[statisticsStyles.valueText, { color: colors.primary }]}>
                    {item.value}
                  </Text>
                </View>
              </View>
            );
          })}

          {canExpand && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsExpanded(!isExpanded)}
              style={[statisticsStyles.expandButton, { borderTopColor: colors.outlineVariant }]}
            >
              <Text variant="labelLarge" style={{ color: colors.primary }}>
                {isExpanded ? t("seeLess") : t("seeMore")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={[statisticsStyles.noPlayers, { backgroundColor: colors.surfaceVariant }]}>
          <Text variant="bodyMedium" style={{ color: colors.outline }}>
            {t("noPlayers")}
          </Text>
        </View>
      )}
    </View>
  )

})

export default TableStatistic