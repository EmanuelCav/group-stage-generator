import { memo } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";

import MatchElimination from "./components/MatchElimination";

import { ColumnEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

const MATCH_HEIGHT = 120;

const ColumnElimination = memo(({ text, matches, colors, indexElimination, handleGetMatch, group, spacing, isFullName, handleUpdateTeamMatch, isEditMode, t }: ColumnEliminationPropsType) => {

  const { height, width } = useWindowDimensions();

  const MATCH_GAP = Math.max(8, Math.min(14, height * 0.012));

  const SLOT_HEIGHT = MATCH_HEIGHT + MATCH_GAP;

  const MATCH_WIDTH = width / 1.44;
  const CONNECTOR_WIDTH = width / 13;

  return (
    <View style={[eliminationStyles.column, { backgroundColor: colors.background }]}>
      <Text variant="titleMedium" style={eliminationStyles.roundTitle}>
        {text}
      </Text>

      {matches.map((match, index) => {

        const containerHeight = SLOT_HEIGHT * Math.pow(2, indexElimination);

        return (
          <View
            key={index}
            style={{
              height: containerHeight,
              width: MATCH_WIDTH,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >

            {indexElimination > 0 && (
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: -CONNECTOR_WIDTH,
                  width: CONNECTOR_WIDTH,
                  height: '100%',
                }}
              >

                <View
                  style={{
                    position: 'absolute',
                    left: CONNECTOR_WIDTH / 2,
                    top: '25%',
                    height: '50%',
                    width: 2,
                    backgroundColor: colors.primary,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '25%',
                    width: CONNECTOR_WIDTH / 2,
                    height: 2,
                    backgroundColor: colors.primary,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '75%',
                    width: CONNECTOR_WIDTH / 2,
                    height: 2,
                    backgroundColor: colors.primary,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    left: CONNECTOR_WIDTH / 2,
                    top: '50%',
                    width: CONNECTOR_WIDTH / 2,
                    height: 2,
                    backgroundColor: colors.primary,
                  }}
                />

              </View>
            )}

            <MatchElimination
              match={match}
              colors={colors}
              indexElimination={indexElimination}
              handleUpdateTeamMatch={handleUpdateTeamMatch}
              isEditMode={isEditMode}
              handleGetMatch={handleGetMatch}
              group={group}
              spacing={spacing}
              isFullName={isFullName}
              index={index}
              t={t}
            />

          </View>
        )
      })}
    </View>
  )
})

export default ColumnElimination;