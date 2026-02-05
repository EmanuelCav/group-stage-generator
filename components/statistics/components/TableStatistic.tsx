import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import i18n from '@/i18n'

import { View } from "@/components/Themed";

import { TableStatisticPropsType } from "@/types/statistics.types";

import { groupStyles } from "@/styles/group.styles";
import { statisticsStyles } from "@/styles/statistics.styles";

import { namePlayerStatistic, playerStatistics } from "@/utils/statistics";
import { groupName } from "@/utils/points";

const TableStatistic = ({ colors, itemStatistic, indexStatistic }: TableStatisticPropsType) => {
  return (
    <View style={groupStyles.groupList}>
      <View>
        <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
          <Text variant="labelSmall" style={groupStyles.statisticsCellMain}>
            {i18n.t("player")}
          </Text>
          <Text variant="labelSmall" style={groupStyles.statisticsCellMain}>
            {i18n.t("teamName")}
          </Text>
        </View>
        {
          itemStatistic.length > 0 ?
            <FlatList
              data={itemStatistic}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => (
                <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                  <Text style={groupStyles.statisticsCell} variant="bodySmall">{namePlayerStatistic(item.player)}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.tertiary }}>
                    <Text style={groupStyles.statisticsCell} variant="bodySmall">{groupName(item.team)}</Text>
                  </View>
                </View>
              )}
            /> : <View style={statisticsStyles.noPlayerStatistics}>
              <Text variant="bodySmall">{i18n.t("noPlayers")}</Text>
            </View>
        }
      </View>
      <View>
        <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
          <Text variant="bodySmall" style={groupStyles.statisticsCellMain}>
            {playerStatistics[indexStatistic]}
          </Text>
        </View>
        <FlatList
          data={itemStatistic}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
              <Text style={groupStyles.statisticsCell} variant="bodySmall">{item.value}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default TableStatistic