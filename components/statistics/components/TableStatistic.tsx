import { Dimensions, FlatList, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import i18n from '@/i18n'

import { View } from "@/components/Themed";

import { TableStatisticPropsType } from "@/types/statistics.types";

import { groupStyles } from "@/styles/group.styles";

import { namePlayerStatistic } from "@/utils/statistics";
import { groupName } from "@/utils/points";

const TableStatistic = ({ colors, group, itemStatistic, indexStatistic }: TableStatisticPropsType) => {
  return (
    <View style={groupStyles.groupList}>
      <View>
        <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
          <Text variant="labelMedium" style={groupStyles.statisticsCellMain}>
            {i18n.t("player")}
          </Text>
          <Text variant="labelMedium" style={groupStyles.statisticsCellMain}>
            {i18n.t("teamName")}
          </Text>
        </View>
        <FlatList
          data={itemStatistic}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
              <Text style={groupStyles.statisticsCell} variant="bodyMedium">{namePlayerStatistic(item.player)}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.tertiary }}>
                <Text style={groupStyles.statisticsCell} variant="bodyMedium">{groupName(item.team)}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View>
        <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
          <Text variant="labelMedium" style={groupStyles.statisticsCellMain}>
            {group.players![0].statistics![indexStatistic].title}
          </Text>
        </View>
        <FlatList
          data={itemStatistic}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
              <Text style={groupStyles.statisticsCell} variant="bodyMedium">{item.value}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default TableStatistic