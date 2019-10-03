<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="pr">
        <html>
            <head>
                <title><xsl:value-of select="metadata/title"/></title>
                <meta charset="UTF-8"/>
            </head>
        </html>
        <body style="margin: 1%">
            <h1 style="text-align: center"><xsl:value-of select="metadata/title"/></h1>
            <h2 style="text-align: center"><xsl:value-of select="metadata/subtitle"/></h2>
            <hr/>
            <table>
                <tbody>
                    <tr>
                        <td><b>Key name: </b><xsl:value-of select="metadata/keyname"/></td>
                    </tr>
                    <tr>
                        <td><b>Title: </b><xsl:value-of select="metadata/title"/></td>
                    </tr>
                    <tr>
                        <td><b>Subtitle: </b><xsl:value-of select="metadata/subtitle"/></td>
                    </tr>
                    <tr>
                        <td><b>Date: </b><xsl:value-of select="metadata/bdate"/> - <xsl:value-of select="metadata/edate"/></td>
                    </tr>
                    <tr>
                        <td>
                            <b>Supervisor: </b>
                            <xsl:choose>
                                <xsl:when test="metadata/supervisor/@homepage">
                                    <a href="{metadata/supervisor/@homepage}"><xsl:value-of select="metadata/supervisor"/></a>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="metadata/supervisor"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <hr/>
            <h3>Workteam:</h3>
            <ol>
                <xsl:apply-templates select="workteam/worker"/>
            </ol>
            <hr/>
            <hr/>
            <h3>Abstract:</h3>
            <xsl:apply-templates select="abstract"/>
            <hr/>
            <hr/>
            <h3>Deliverables:</h3>
            <ul>
                <xsl:apply-templates select="deliverables/deliverable"/>
            </ul>
        </body>
    </xsl:template>

    <xsl:template match="worker">
        <li>
            <xsl:value-of select="name"/> - <xsl:value-of select="email"/>
            <xsl:choose>
                <xsl:when test="git"> - <a href="{git}"><xsl:value-of select="git"/></a></xsl:when>
            </xsl:choose>
        </li>
    </xsl:template>

    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>

    <xsl:template match="abstract/p">
        <p><xsl:apply-templates select="text()|p|b|i|u|xref"/></p>
    </xsl:template>

    <xsl:template match="b">
        <b><xsl:apply-templates select="text()|p|b|i|u|xref"/></b>
    </xsl:template>

    <xsl:template match="i">
        <i><xsl:apply-templates select="text()|p|b|i|u|xref"/></i>
    </xsl:template>

    <xsl:template match="u">
        <u><xsl:apply-templates select="text()|p|b|i|u|xref"/></u>
    </xsl:template>

    <xsl:template match="xref">
        <a href="{@url}"><xsl:apply-templates select="text()|p|b|i|u|xref"/></a>
    </xsl:template>
</xsl:stylesheet>
