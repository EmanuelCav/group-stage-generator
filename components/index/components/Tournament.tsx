import { Card, IconButton, MD3Colors, Text } from "react-native-paper";
import { View, Image, Dimensions } from "react-native";

import { TournamentPropsType } from "@/types/index.types";

import { indexStyles } from "@/styles/index.styles";

const Tournament = ({ group, colors, handleGroup }: TournamentPropsType) => {
    return (
        <Card style={{ marginTop: Dimensions.get("window").height / 74 }}
            onPress={() => handleGroup(group)}>
            <Card.Content style={{ backgroundColor: colors.primary }}>
                <View style={indexStyles.containTournament}>
                    {
                        group.logo ? <Image
                            source={{ uri: group.logo }}
                            style={indexStyles.imageTournament}
                            resizeMode="contain"
                        /> : <IconButton
                            icon="trophy"
                            iconColor={MD3Colors.neutral100}
                            size={40}
                        />
                    }
                    <View style={{ flex: 1 }}>
                        <Text variant="titleLarge" style={indexStyles.textTournament}
                            numberOfLines={1}>
                            {group.title?.slice(0, 20)}
                        </Text>
                        <Text variant="labelLarge" style={indexStyles.textTournament}>
                            Number of teams: {group.teams.length}
                        </Text>
                        <Text variant="labelSmall" style={{ color: "#eeeeee" }}>
                            Created at: {group.createdAt?.toString().split("T")[0]}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default Tournament;
