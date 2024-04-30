import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {},
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

const Invoice = ({ entry }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.subtitle}>{entry.subtitle}</Text>
        <Text style={styles.description}>{entry.description}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{entry.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Event Date:</Text>
          <Text style={styles.value}>{entry.eventDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User:</Text>
          <Text style={styles.value}>{entry.user}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Groups:</Text>
          <View style={styles.value}>
            {entry.groups.map((group) => (
              <Text key={group._id}>{group.name}</Text>
            ))}
          </View>
        </View>
        <Text>
          {entry.file &&
            (entry.file.endsWith(".pdf") ? (
              <View style={styles.row}>
                <Text style={styles.label}>File:</Text>
                <Link style={styles.value} src={entry.file}>
                  Download PDF
                </Link>
              </View>
            ) : (
              <View style={styles.row}>
                <Text style={styles.label}>File:</Text>
                <Image style={styles.image} src={entry.file} />
              </View>
            ))}
        </Text>
      </Page>
    </Document>
  );
};

export default Invoice;
