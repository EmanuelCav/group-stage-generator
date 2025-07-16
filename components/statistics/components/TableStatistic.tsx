import { FlatList, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import i18n from '@/i18n'

import { View } from "@/components/Themed";

import { TableStatisticPropsType } from "@/types/statistics.types";

import { groupStyles } from "@/styles/group.styles";

import { namePlayerStatistic, tableStatistics } from "@/utils/statistics";
import { groupName } from "@/utils/points";

const TableStatistic = ({ colors, group, item }: TableStatisticPropsType) => {
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
        {/* <FlatList
          style={{ backgroundColor: "#F5F5F9" }}
          data={tableStatistics(group)}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }: { item: { [key: string]: number } }) => (
            <View style={groupStyles.row} key={key}>
                  <View style={groupStyles.cellStatisticMain}>
                    <Text variant="bodyMedium">
                      {key === "team" ? groupName(String(value)) : namePlayerStatistic(String(value))}
                    </Text>
                  </View>
            </View>
          )}
        /> */}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
            {group.players![0].statistics?.map((statistic) => {
              return (
                <Text
                  variant="labelMedium"
                  key={statistic.id}
                  style={groupStyles.statisticsCell}
                >
                  {statistic.title}
                </Text>
              );
            })}
          </View>
          <FlatList
            data={tableStatistics(group)}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }: { item: { [key: string]: number } }) => (
              <View style={groupStyles.row}>
                {Object.entries(item)
                  .slice(2, Object.entries(item).length)
                  .map(([key, value]) => (
                    <View key={key} style={groupStyles.cellStatistic}>
                      <Text variant="bodyMedium">{value}</Text>
                    </View>
                  ))}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default TableStatistic